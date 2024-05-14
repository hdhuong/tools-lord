#!/bin/bash

# Function for the first set of database connections
restore_databases_set1() {
  SOURCE_HOST="10.1.14.132"
  SOURCE_PORT="27018"
  SOURCE_USERNAME="admin"
  SOURCE_PASSWORD="SnP202211"

  TARGET_HOST="10.1.26.63"
  TARGET_PORT="6968"
  TARGET_USERNAME="admin"
  TARGET_PASSWORD="snp123456"

  SOURCE_DATABASES=("smc_stg_cost_center" "smc_stg_file_watcher" "sale-order-instruction" 
  "smc_stg_production_order" "invoice" "smc_stg_item_packing" 
  "smc_stg_item-stock-planning" "smc_stg_work_order" "smc_stg_worker_salary" "smc_stg_mms")

  TARGET_DATABASES=("cost-centers" "file-watchers" "sale-order-instructions" "production-orders" "invoices" 
  "item-packings" "item-stock-plannings" "work-orders" "worker-salary" "mms")
  
  execute_restore
}

# Function for the second set of database connections
restore_databases_set2() {
  SOURCE_HOST="10.1.14.47"
  SOURCE_PORT="27018"
  SOURCE_USERNAME="admin"
  SOURCE_PASSWORD="SnP202212"

  TARGET_HOST="10.1.26.63"
  TARGET_PORT="6968"
  TARGET_USERNAME="admin"
  TARGET_PASSWORD="snp123456"

  SOURCE_DATABASES=("demo_senko_cost_center" "demo_senko_file_watcher" "demo_senko_sale_order_instruction" 
  "demo_senko_production_order" "demo_senko_invoice" "demo_senko_item_packing" 
  "demo_senko_item_stock_planning" "demo_senko_work_order" "demo_senko_worker_salary" "demo_senko_mms")

  TARGET_DATABASES=("cost-centers" "file-watchers" "sale-order-instructions" "production-orders" "invoices" 
  "item-packings" "item-stock-plannings" "work-orders" "worker-salary" "mms")

  execute_restore
}

# Common function to execute the restore process
execute_restore() {
  SOURCE_CONTAINER_NAME="docker-mongodb"
  TARGET_CONTAINER_NAME="docker-mongodb"

  # Optional: If authentication is required for source
  SOURCE_AUTH_PARAMS=""
  if [ -n "$SOURCE_USERNAME" ] && [ -n "$SOURCE_PASSWORD" ]; then
    SOURCE_AUTH_PARAMS="--username $SOURCE_USERNAME --password $SOURCE_PASSWORD --authenticationDatabase admin"
  fi

  # Optional: If authentication is required for target
  TARGET_AUTH_PARAMS=""
  if [ -n "$TARGET_USERNAME" ] && [ -n "$TARGET_PASSWORD" ]; then
    TARGET_AUTH_PARAMS="--username $TARGET_USERNAME --password $TARGET_PASSWORD --authenticationDatabase admin"
  fi

  # Run mongorestore for specified databases
  for i in "${!SOURCE_DATABASES[@]}"
  do
    SOURCE_DATABASE="${SOURCE_DATABASES[$i]}"
    TARGET_DATABASE="${TARGET_DATABASES[$i]}"

    # Clear all collections in the target database
    docker exec -i $TARGET_CONTAINER_NAME mongo --host $TARGET_HOST --port $TARGET_PORT $TARGET_AUTH_PARAMS $TARGET_DATABASE --eval "db.getCollectionNames().forEach(function(c){db[c].drop()})"

    # Dump the source database
    docker exec -i $SOURCE_CONTAINER_NAME mongodump --host $SOURCE_HOST --port $SOURCE_PORT $SOURCE_AUTH_PARAMS --db $SOURCE_DATABASE --gzip --archive=$SOURCE_DATABASE.archive

    # Restore the source database to the target with --drop option
    docker exec -i $TARGET_CONTAINER_NAME mongorestore --host $TARGET_HOST --port $TARGET_PORT $TARGET_AUTH_PARAMS --nsFrom $SOURCE_DATABASE.* --nsTo $TARGET_DATABASE.* --gzip --archive=$SOURCE_DATABASE.archive --drop

    echo "Restore for database $SOURCE_DATABASE to $TARGET_DATABASE completed successfully."
  done

  echo "All restores completed successfully."
}

# Menu to select the database set
echo "Select the database set to restore:"
echo "1) SMC Staging"
echo "2) Senko Demo"
read -p "Enter your choice: " choice

case $choice in
  1)
    restore_databases_set1
    ;;
  2)
    restore_databases_set2
    ;;
  *)
    echo "Invalid choice. Exiting."
    exit 1
    ;;
esac

