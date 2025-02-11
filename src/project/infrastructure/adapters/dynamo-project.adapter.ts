import { IProject } from 'src/project/domain/interface/project.interface';
import { ProjectRepository } from 'src/project/domain/repository/project.repository';
import { IUser } from 'src/user/domain/interface/user.interface';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DeleteCommandInput,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  PutCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';

export class DynamoProjectAdapter implements ProjectRepository {
  private readonly dynamoDb: DynamoDBDocumentClient;
  private readonly tableName: string = 'users';

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

  async save(project: IProject): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: { ...project, ownerId: project.owner },
    };

    const command = new PutCommand(params);
    await this.dynamoDb.send(command);
  }

  async list(userId: IUser['id']): Promise<IProject[]> {
    const params = {
      TableName: this.tableName,
      FilterExpression: 'ownerId = :ownerId',
      ExpressionAttributeValues: {
        ':ownerId': userId,
      },
    };

    const command = new ScanCommand(params);
    const result = await this.dynamoDb.send(command);

    return result.Items.map(
      (item: any) =>
        ({
          id: item.id,
          name: item.name,
          description: item.description,
          owner: item.ownerId,
        }) as IProject,
    );
  }

  async get(id: IProject['id']): Promise<IProject> {
    const params: GetCommandInput = {
      TableName: this.tableName,
      Key: {
        id: id,
      },
    };

    const command = new GetCommand(params);
    const result = await this.dynamoDb.send(command);

    if (!result.Item) return null;

    return {
      id: result.Item.id,
      name: result.Item.name,
      description: result.Item.description,
      owner: result.Item.owner,
    } as IProject;
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
