import { join } from 'node:path'
import { homedir } from 'node:os'
import { existsSync } from 'node:fs';

import SettingsExec from './settings/main'
import MainExec from './main/main'

console.log(existsSync(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\bin')));

if (existsSync(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\bin'))) {
  MainExec()
} else {
  SettingsExec()
}