import envs from '../constants/envs';
import { ENV } from '../config';

const IS_DEV = ENV === envs.development;
const IS_PROD = ENV === envs.production;

export { IS_DEV, IS_PROD };
