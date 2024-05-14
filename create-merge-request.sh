#!/bin/bash

# GitLab details
GITLAB_URL=""
PRIVATE_TOKEN=""

# DEFINE PROJECT IDS
PROJECT_IDS=(
  
)

# Function to create a merge request
create_merge_request() {
  local project_id=$1
  local source_branch=$2
  local target_branch=$3

  local merge_request_title="Develop"
  local merge_request_description="This is an automated merge request created by a script."

  response=$(curl --silent --write-out "HTTPSTATUS:%{http_code}" --request POST "${GITLAB_URL}/api/v4/projects/${project_id}/merge_requests" \
       --header "PRIVATE-TOKEN: ${PRIVATE_TOKEN}" \
       --header "Content-Type: application/json" \
       --data "{
         \"source_branch\": \"${source_branch}\",
         \"target_branch\": \"${target_branch}\",
         \"title\": \"${merge_request_title}\",
         \"description\": \"${merge_request_description}\"
       }")

  # Extract the body and the status
  body=$(echo "${response}" | sed -e 's/HTTPSTATUS\:.*//g')
  http_status=$(echo "${response}" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')

  if [ "${http_status}" -ne 201 ]; then
    echo "Failed to create merge request for project ${project_id} (${source_branch} -> ${target_branch}): ${body}"
  else
    echo "Successfully created merge request for project ${project_id} (${source_branch} -> ${target_branch})"
  fi
}

# Function to display the project selection menu and process the selection
select_project() {
  echo "Select a project to create a merge request:"
  echo "1) COST CENTER"
  echo "2) FILE WATCHER"
  echo "3) INVOICE"
  echo "4) ITEM PACKING"
  echo "5) ITEM"
  echo "6) ITEM STOCK PLANING"
  echo "7) MMS"
  echo "8) PLAN"
  echo "9) PRODUCE"
  echo "10) PRODUCTION ORDER"
  echo "11) REQUEST"
  echo "12) SALE ORDER INSTRUCTION"
  echo "13) SALE"
  echo "14) TICKET"
  echo "15) USER"
  echo "16) WAREHOUSE"
  echo "17) WORKER SALARY"
  echo "18) WORK ORDER"
  read -p "Enter your choice: " choice

  case $choice in
    1)
      PROJECT_ID=${PROJECT_IDS[0]}
      ;;
    2)
      PROJECT_ID=${PROJECT_IDS[1]}
      ;;
    3)
      PROJECT_ID=${PROJECT_IDS[2]}
      ;;
    4)
      PROJECT_ID=${PROJECT_IDS[3]}
      ;;
    5)
      PROJECT_ID=${PROJECT_IDS[4]}
      ;;
    6)
      PROJECT_ID=${PROJECT_IDS[5]}
      ;;
    7)
      PROJECT_ID=${PROJECT_IDS[6]}
      ;;
    8)
      PROJECT_ID=${PROJECT_IDS[7]}
      ;;
    9)
      PROJECT_ID=${PROJECT_IDS[8]}
      ;;
    10)
      PROJECT_ID=${PROJECT_IDS[9]}
      ;;
    11)
      PROJECT_ID=${PROJECT_IDS[10]}
      ;;
    12)
      PROJECT_ID=${PROJECT_IDS[11]}
      ;;
    13)
      PROJECT_ID=${PROJECT_IDS[12]}
      ;;
    14)
      PROJECT_ID=${PROJECT_IDS[13]}
      ;;
    15)
      PROJECT_ID=${PROJECT_IDS[14]}
      ;;
    16)
      PROJECT_ID=${PROJECT_IDS[15]}
      ;;
    17)
      PROJECT_ID=${PROJECT_IDS[16]}
      ;;
    18)
      PROJECT_ID=${PROJECT_IDS[17]}
      ;;
    *)
      echo "Invalid choice, exiting."
      exit 1
      ;;
  esac
  create_merge_request "${PROJECT_ID}" "develop" "staging"
}

# Display project selection menu
select_project
