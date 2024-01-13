import { NodeServer } from './server/index';
import { Auth } from './auth/auth.controller';

NodeServer.create([Auth]);
