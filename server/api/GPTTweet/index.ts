import type { TweetModel } from '$/commonTypesWithClient/models';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqBody: { message: string };
    resBody: TweetModel[];
  };
}>;
