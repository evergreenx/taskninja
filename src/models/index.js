// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Note, Todo } = initSchema(schema);

export {
  Note,
  Todo
};