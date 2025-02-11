import { IUser } from 'src/user/domain/interface/user.interface';
import { UserRepository } from 'src/user/domain/repository/user.repository';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

export class DynamoUserAdapter implements UserRepository {
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

  async save(user: IUser): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: user,
    };

    const command = new PutCommand(params);
    await this.dynamoDb.send(command);
  }

  async getByUsername(username: string): Promise<IUser> {
    const params = {
      TableName: this.tableName,
      FilterExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username,
      },
    };

    const command = new ScanCommand(params);
    const result = await this.dynamoDb.send(command);

    if (result.Items.length > 0) {
      return {
        id: result.Items[0].id,
        username: result.Items[0].username,
        password: result.Items[0].password,
        role: result.Items[0].role,
      };
    }
    return null;
  }
}
