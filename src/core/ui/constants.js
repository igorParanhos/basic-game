import { createEnum } from '../../utils/enum';

export const STATUS = createEnum(['FAIL', 'SUCCESS', 'NEXT_LEVEL']);
export const GAME_STATUS = createEnum(['PLAYING', 'PAUSED', 'STOPPED']);
