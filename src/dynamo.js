import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

//handler/utilities functions will be the only functions in here.
const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client)
const TABLE = 'todo'

export async function scanTodos() {
const { Items } = await docClient.send(
    new ScanCommand({TableName: "todo"})
);
return Items || [];
}

export async function createTodo(todo) {
    await docClient.send(new PutCommand({TableName: TABLE, Item: todo}))
}


export async function deleteTodo(id) {
  await docClient.send(
    new DeleteCommand({TableName: TABLE, Key: {id} }))
  };


