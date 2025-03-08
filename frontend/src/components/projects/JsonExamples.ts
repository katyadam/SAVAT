export const exampleCallGraph = `{
    "methods": [
      {
        "id": 0,
        "name": "string",
        "type": "string",
        "parameters": [
          "string"
        ],
        "returnType": "string",
        "display": "string",
        "flags": "string",
        "bytecodeHash": "string",
        "microservice": "string",
        "endpointURI": "string",
        "httpMethod": "string",
        "endpointMethod": true,
        "entryPoint": true,
        "methodSignature": "string"
      }
    ],
    "calls": [
      {
        "source": "string",
        "target": "string",
        "isInterserviceCall": true,
        "httpMethod": "string"
      }
    ]
}`;

export const exampleContextMap = `{
    "nodes": [
      {
        "msName": "string",
        "nodeName": "string",
        "nodeFullName": "string",
        "fields": [
          {
            "fieldName": "string",
            "fieldFullName": "string",
            "fieldType": "string",
            "fieldAnnotations": [
              {
                "annotation": "string"
              }
            ],
            "fieldIsReference": true,
            "fieldEntityRefName": "string",
            "isCollection": true
          }
        ]
      }
    ],
    "links": [
      {
        "source": "string",
        "target": "string",
        "msSource": "string",
        "msTarget": "string",
        "sourceMultiplicity": "string",
        "targetMultiplicity": 0
      }
    ]
}`;

export const exampleSDG = `{
    "nodes": [
      {
        "nodeName": "string",
        "nodeType": "string"
      }
    ],
    "links": [
      {
        "source": "string",
        "target": "string",
        "requests": [
          {
            "type": "string",
            "uri": "string",
            "requestReturn": "string",
            "endpointFunction": "string",
            "endpointMsName": "string",
            "targetEndpointUri": "string",
            "isCollection": true,
            "parentMethod": "string",
            "msName": "string",
            "restCallInClassName": "string"
          }
        ]
      }
    ]
}`;

