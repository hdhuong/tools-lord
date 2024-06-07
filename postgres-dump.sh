#!/bin/bash

# Set the 'set -e' option to exit immediately if a command exits with a non-zero status
set -e

# Remove all existing dump files
rm -rf ~/Documents/workspace/dbdump/postgres/*

# Output directory for the dump files
OUTPUT_DIR="/Users/hdhuong/Documents/workspace/dbdump/postgres"

# PostgreSQL local connection details
LOCAL_DB_HOST="localhost"
LOCAL_DB_PORT=""
LOCAL_DB_USER="postgres"
LOCAL_DB_PASSWORD=""

# Path to your local pg_dump and psql executables
PG_DUMP_PATH="/usr/local/bin/pg_dump"
PSQL_PATH="/usr/local/bin/psql"

# Define database sets
DB_SET_1=()
DB_SET_2=()
TARGET_DATABASES=("" "" "" "" "" "")

# Ensure the output directory exists, create it if not
mkdir -p "$OUTPUT_DIR"

# Function to perform database dump
perform_dump() {
    local DB_NAME=$1
    local DUMP_FILE="$OUTPUT_DIR/$DB_NAME-$(date +"%Y%m%d%H%M%S").sql"

    PGPASSWORD=$DB_PASSWORD $PG_DUMP_PATH -h $DB_HOST -p $DB_PORT -U $DB_USER -b -v -f $DUMP_FILE $DB_NAME

    echo "Backup of $DB_NAME completed successfully. File: $DUMP_FILE"
}

# Function to drop and recreate the "public" schema
reset_schema() {
    local LOCAL_DB_NAME=$1

    $PSQL_PATH -h $LOCAL_DB_HOST -p $LOCAL_DB_PORT -U $LOCAL_DB_USER -d $LOCAL_DB_NAME -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

    echo "Schema 'public' dropped and recreated successfully for database: $LOCAL_DB_NAME"
}

# Function to perform database restore
perform_restore() {
    local DUMP_DB_NAME=$1
    local TARGET_DB_NAME=$2

    DUMP_FILE=$(ls -t "$OUTPUT_DIR/$DUMP_DB_NAME"-*.sql | head -n 1)

    echo "Restoring $DUMP_DB_NAME to $TARGET_DB_NAME from file: $DUMP_FILE"

    $PSQL_PATH -h $LOCAL_DB_HOST -p $LOCAL_DB_PORT -U $LOCAL_DB_USER --dbname=$TARGET_DB_NAME -f $DUMP_FILE

    echo "Restore to $TARGET_DB_NAME completed successfully from file: $DUMP_FILE"
}

# Function to display menu and set variables
select_database_set() {
    echo "Select the database set to work with:"
    echo "1) Senko Demo"
    echo "2) SMC Staging"
    read -p "Enter your choice: " choice

    case $choice in
        1)
            DB_HOST=${DB_SET_1[0]}
            DB_PORT=${DB_SET_1[1]}
            DB_USER=${DB_SET_1[2]}
            DB_PASSWORD=${DB_SET_1[3]}
            DATABASES=("${DB_SET_1[@]:4}")
            ;;
        2)
            DB_HOST=${DB_SET_2[0]}
            DB_PORT=${DB_SET_2[1]}
            DB_USER=${DB_SET_2[2]}
            DB_PASSWORD=${DB_SET_2[3]}
            DATABASES=("${DB_SET_2[@]:4}")
            ;;
        *)
            echo "Invalid choice, exiting."
            exit 1
            ;;
    esac
}

# Run the selection menu
select_database_set

# Dump databases
for DB_NAME in "${DATABASES[@]}"; do
    perform_dump "$DB_NAME"
done

echo "All database backups completed."

export PGPASSWORD=$LOCAL_DB_PASSWORD

# Reset schemas
for LOCAL_DB_NAME in "${TARGET_DATABASES[@]}"; do
    reset_schema "$LOCAL_DB_NAME"
done

# Restore databases
for index in "${!DATABASES[@]}"; do
    perform_restore "${DATABASES[$index]}" "${TARGET_DATABASES[$index]}"
done

echo "All database restores completed."

# Unset PGPASSWORD
unset PGPASSWORD

