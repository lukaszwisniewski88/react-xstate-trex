import { Subject } from 'rxjs';

const events$ = new Subject<{
  type: string;
  payload: any;
}>();

export default events$;
