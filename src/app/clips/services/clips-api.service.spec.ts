import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { RedditPostData, RedditPostObj } from 'src/app/shared/types/reddit.types';

import { BASE_URL, ClipsApiService, PAGE_SIZE } from './clips-api.service';

function createMockPost(id = 'test1', withMedia = true): RedditPostData {
  const media = withMedia
    ? {
        reddit_video: {
          fallback_url: `https://www.reddit.com/`,
        },
      }
    : undefined;

  return { id, secure_media: media } as RedditPostData;
}

function createMockCrossPost(id = 'test1', childId = 'child1'): RedditPostData {
  return { id, crosspost_parent_list: [createMockPost(childId)] } as RedditPostData;
}

function createMockPostObj(id = 'test1', withMedia = true): RedditPostObj {
  return { kind: 't3', data: createMockPost(id, withMedia) } as RedditPostObj;
}

function createMockCrossPostObj(id = 'test1', childId = 'child1'): RedditPostObj {
  return { kind: 't3', data: createMockCrossPost(id, childId) } as RedditPostObj;
}

function createHotRequest(limit = 1, after?: string) {
  return {
    method: 'GET',
    url: `${BASE_URL}/hot.json?limit=${limit}${after ? `&after=${after}` : ''}`,
  };
}

function createCommentsRequest(id: string) {
  return {
    method: 'GET',
    url: `${BASE_URL}/comments/${id}.json?limit=1`,
  };
}

describe('ClipsApiService', () => {
  let httpTestingController: HttpTestingController;

  let service: ClipsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClipsApiService, provideHttpClient(), provideHttpClientTesting()],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ClipsApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFirstPost', () => {
    it('should return the last post in the list', async () => {
      const postPromise = firstValueFrom(service.getFirstPost());
      const postRequest = httpTestingController.expectOne(createHotRequest());

      const mockPromoPostObj = createMockCrossPostObj('promo');
      const mockPostObj = createMockPostObj();

      postRequest.flush({ data: { children: [mockPromoPostObj, mockPostObj] } });

      expect(await postPromise).toEqual(mockPostObj);
    });
  });

  describe('getPostById', () => {
    it('should return the post with the given id', async () => {
      const postId = 'test1';

      const postPromise = firstValueFrom(service.getPostById(postId));
      const postRequest = httpTestingController.expectOne(createCommentsRequest(postId));

      const mockPostObj = createMockPostObj(postId);

      postRequest.flush([{ data: { children: [mockPostObj] } }]);

      expect(await postPromise).toEqual(mockPostObj);
    });
  });

  describe('getInitialPost', () => {
    it('should call getFirstPost if no id is provided', async () => {
      const getFirstPostSpy = jest.spyOn(service, 'getFirstPost');

      const postPromise = firstValueFrom(service.getInitialPost());
      const postRequest = httpTestingController.expectOne(createHotRequest());

      const mockPostObj = createMockPostObj();

      postRequest.flush({ data: { children: [mockPostObj] } });

      expect(await postPromise).toEqual(mockPostObj.data);
      expect(getFirstPostSpy).toHaveBeenCalledTimes(1);
    });

    it('should call getPostById if an id is provided', async () => {
      const getPostByIdSpy = jest.spyOn(service, 'getPostById');

      const postId = 'test1';

      const postPromise = firstValueFrom(service.getInitialPost(postId));
      const postRequest = httpTestingController.expectOne(createCommentsRequest(postId));

      const mockPostObj = createMockPostObj(postId);

      postRequest.flush([{ data: { children: [mockPostObj] } }]);

      expect(await postPromise).toEqual(mockPostObj.data);
      expect(getPostByIdSpy).toHaveBeenCalledTimes(1);
      expect(getPostByIdSpy).toHaveBeenCalledWith(postId);
    });
  });

  describe('getPosts', () => {
    it('should return the posts', async () => {
      const postsPromise = firstValueFrom(service.getPosts());
      const postsRequest = httpTestingController.expectOne(createHotRequest(PAGE_SIZE));

      const postsResponse = [
        createMockPostObj('test0', false),
        createMockPostObj('test1'),
        createMockPostObj('test2'),
        createMockPostObj('test3'),
        createMockPostObj('test4'),
        createMockPostObj('test5'),
        createMockPostObj('test6'),
        createMockPostObj('test7'),
        createMockPostObj('test8'),
        createMockPostObj('test9'),
        createMockCrossPostObj('test10', 'child10'),
      ];

      postsRequest.flush({ data: { children: postsResponse } });

      const postsResult = await postsPromise;

      expect(postsResult.length).toEqual(PAGE_SIZE);

      postsResult.forEach((post) => {
        expect(post.secure_media?.reddit_video).toBeDefined();
      });
    });
  });
});
