import requests
import json
from pprint import pprint
API_URL = "https://api.newlxp.ru/graphql"

# Авторизация
def sign_in(EMAIL, PASSWORD):
    query = """
    query SignIn($input: SignInInput!) {
      signIn(input: $input) {
        user {
          id
          isLead
          __typename
        }
        accessToken
        __typename
      }
    }
    """
    variables = {
        "input": {
            "email": EMAIL,
            "password": PASSWORD
        }
    }

    response = requests.post(API_URL, json={"query": query, "variables": variables})
    if response.status_code == 200:
        result = response.json()
        
        # Проверяем наличие ошибок в теле ответа
        if "errors" in result:
            return False
            
        # Проверяем, получили ли мы токен
        if result.get("data") and result["data"].get("signIn"):
    
            return True
      
    else:
        print(f"Ошибка HTTP: {response.status_code}")
        print(response.text)
        exit(1)
