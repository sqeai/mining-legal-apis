window.onload = function() {
  //<editor-fold desc="Changeable Configuration Block">

  // the following lines will be replaced by docker/configurator, when it runs in a docker-container
  window.ui = SwaggerUIBundle({
    spec: {
      "openapi": "3.0.3",
      "info": {
        "title": "Document Flow API",
        "version": "1.0.0",
        "description": "API for managing document processing flows, including upload, OCR, approvals, and document generation."
      },
      "servers": [
        {
          "url": "https://api.example.com"
        }
      ],
      "paths": {
        "/flows": {
          "get": {
            "summary": "Get list of document flows",
            "parameters": [
              {
                "name": "type",
                "in": "query",
                "schema": {
                  "type": "string",
                  "enum": [
                    "NDA",
                    "PA",
                    "CONTRACT"
                  ]
                }
              },
              {
                "name": "status",
                "in": "query",
                "schema": {
                  "type": "string",
                  "enum": [
                    "OPEN",
                    "DRAFT",
                    "REVIEW",
                    "REJECTED",
                    "APPROVED"
                  ]
                }
              },
              {
                "name": "page",
                "in": "query",
                "schema": {
                  "type": "integer",
                  "default": 1
                }
              },
              {
                "name": "size",
                "in": "query",
                "schema": {
                  "type": "integer",
                  "default": 10
                }
              },
              {
                "name": "search",
                "in": "query",
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Successful Response",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "data": {
                          "type": "object",
                          "properties": {
                            "content": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "name": {
                                    "type": "string"
                                  },
                                  "category": {
                                    "type": "string"
                                  },
                                  "type": {
                                    "type": "string"
                                  },
                                  "storage_link": {
                                    "type": "string",
                                    "format": "uri"
                                  }
                                }
                              }
                            },
                            "totalData": {
                              "type": "integer"
                            },
                            "totalPage": {
                              "type": "integer"
                            },
                            "curentPage": {
                              "type": "integer"
                            },
                            "nextPage": {
                              "type": "integer"
                            }
                          }
                        },
                        "message": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          },
          "post": {
            "summary": "Create a new flow",
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string"
                      },
                      "file_type": {
                        "type": "string",
                        "enum": [
                          "docx",
                          "pdf"
                        ]
                      }
                    },
                    "required": [
                      "type",
                      "file_type"
                    ]
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Flow created",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "data": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "string"
                            },
                            "type": {
                              "type": "string"
                            },
                            "name": {
                              "type": "string"
                            },
                            "document_id": {
                              "type": "string"
                            },
                            "document_name": {
                              "type": "string"
                            },
                            "document_type": {
                              "type": "string"
                            },
                            "document_category": {
                              "type": "string"
                            },
                            "upload_url": {
                              "type": "string",
                              "format": "uri"
                            }
                          }
                        },
                        "message": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/flows/{id}": {
          "get": {
            "summary": "Get flow details",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "tab",
                "in": "query",
                "required": false,
                "schema": {
                  "type": "string",
                  "enum": [
                    "pre-draft",
                    "draft",
                    "f1",
                    "diff",
                    "signed-document"
                  ]
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Flow detail returned"
              },
              "202": {
                "description": "Generation Still In Process"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/flows/{id}/generate-documents": {
          "post": {
            "summary": "Generate documents from flow",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "signatories": {
                        "type": "object"
                      },
                      "ocr_results": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Document generated"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/flows/{flow_id}/documents/{document_id}": {
          "post": {
            "summary": "Re-upload flow document",
            "parameters": [
              {
                "name": "flow_id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "document_id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Upload URL provided"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/flows/{flow_id}/documents/signed-document": {
          "post": {
            "summary": "Upload wet signed document",
            "parameters": [
              {
                "name": "flow_id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Upload URL provided"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/flows/{id}/approvals": {
          "patch": {
            "summary": "Edit flow approvals",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "approvals": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Approvals updated"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/flows/{flow_id}/review": {
          "patch": {
            "summary": "Submit review for flow",
            "parameters": [
              {
                "name": "flow_id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "review": {
                        "type": "string",
                        "enum": [
                          "APPROVED",
                          "REJECTED"
                        ]
                      },
                      "reason": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "review"
                    ]
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Review submitted"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/lov/approvals": {
          "get": {
            "summary": "Get approval list",
            "parameters": [
              {
                "name": "type",
                "in": "query",
                "required": false,
                "schema": {
                  "type": "string",
                  "enum": [
                    "NDA",
                    "PA",
                    "CONTRACT"
                  ]
                }
              },
              {
                "name": "query",
                "in": "query",
                "required": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Approvals list returned"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/webhooks/ocr": {
          "post": {
            "summary": "OCR webhook endpoint",
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Webhook received"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        }
      },
      "components": {
        "securitySchemes": {
          "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
          }
        }
      }
    },
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  });

  //</editor-fold>
};
