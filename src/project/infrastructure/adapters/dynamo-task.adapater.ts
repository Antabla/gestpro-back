import { IProject } from 'src/project/domain/interface/project.interface';
import { ITask } from 'src/project/domain/interface/task.interface';
import { TaskRepository } from 'src/project/domain/repository/task.repository';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DeleteCommandInput, DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

export class DynamoTaskAdapter implements TaskRepository {
  private readonly dynamoDb: DynamoDBDocumentClient;
  private readonly tableName: string = 'tasks';

  constructor() {
    this.dynamoDb = DynamoDBDocumentClient.from(
      new DynamoDBClient({
        endpoint: 'http://localhost:4566', // LocalStack endpoint
        region: 'us-east-1',
        credentials: {
          accessKeyId: 'localstack', // Use any dummy values for LocalStack
          secretAccessKey: 'localstack',
        },
      }),
    );
  }

  async save(task: ITask): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: task,
    };

    const command = new PutCommand(params);
    await this.dynamoDb.send(command);
  }

  async list(projectId: IProject['id']): Promise<ITask[]> {
    const params = {
      TableName: this.tableName,
      FilterExpression: 'projectId = :projectId',
      ExpressionAttributeValues: {
        ':projectId': projectId,
      },
    };

    const command = new ScanCommand(params);
    const result = await this.dynamoDb.send(command);

    return result.Items.map(
      (item: any) =>
        ({
          id: item.id,
          description: item.description,
          projectId: item.projectId,
          status: item.status,
        }) as ITask,
    );
  }

  async delete(id: any): Promise<void> {
    const params: DeleteCommandInput = {
      TableName: this.tableName,
      Key: { id: id },
    };

    const command = new DeleteCommand(params);

    await this.dynamoDb.send(command);
  }
}
