import { ClipsEntity } from '../clips.models';

export function createMockClipsEntity(payload: { id: string; name: string; title: string }): ClipsEntity {
  return {
    kind: 't3',
    data: {
      id: payload.id,
      name: payload.name,
      title: payload.title,
      // Other fields are not important for the tests
    },
  } as ClipsEntity;
}
