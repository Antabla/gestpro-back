import { UIDRepository } from 'src/common/domain/repository/uid.repository';
import { v4 as uuidv4 } from 'uuid';

export class UIDAdapter extends UIDRepository {
  generate(): string {
    return uuidv4();
  }
}
