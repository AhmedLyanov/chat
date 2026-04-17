# Тут мы получаем инфу о студенте
# Получение данных пользователя


import requests
import json
from pprint import pprint

API_URL = "https://api.newlxp.ru/graphql"


def get_user_data(token):
    query = """
    query GetMe {
      getMe {
        avatar
        createdAt
        email
        firstName
        id
        isLead
        roles
        phoneNumber
        legalDocumentsApprovedAt
        notificationsSettings {
          isPushDailyDigestOnEmail
          __typename
        }
        assignedSuborganizations {
          suborganization {
            name
            __typename
          }
          __typename
        }
        teacher {
          assignedDisciplines_V2 {
            discipline {
              name
              code
              studyPeriods {
                name
                startDate
                endDate
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
    }
    """
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(API_URL, json={"query": query}, headers=headers)
    if response.status_code == 200:
        result = response.json()
        if result.get("data") and result["data"].get("getMe"):
            return result["data"]["getMe"]
        else:
            raise Exception("Возникла ошибка с API.")
    else:
        raise Exception(f"HTTP error: {response.status_code}, {response.text}")
