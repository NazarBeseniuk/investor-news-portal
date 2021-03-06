﻿using Investor.Service.Interfaces;
using System;
using Investor.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
using Investor.Entity;
using AutoMapper;
using Investor.Repository.Interfaces;
using System.Linq;

namespace Investor.Service
{
    public class NewsService : INewsService
    {
        private readonly INewsRepository _newsRepository;
        private readonly IPostRepository _postRepository;
        private readonly ITagService _tagService;

        public NewsService(INewsRepository newsRepository, ITagService tagService, IPostRepository postRepository)
        {
            _newsRepository = newsRepository;
            _tagService = tagService;
            _postRepository = postRepository;
        }

        public async Task<News> AddNewsAsync(News map)
        {
            if (map.Title == null)
            {
                map.Title = Guid.NewGuid().ToString();
            }
            map.ModifiedOn = DateTime.Now;
            map.CreatedOn = DateTime.Now;
            var response = await _postRepository.AddPostAsync<NewsEntity>(Mapper.Map<News, NewsEntity>(map));
            map.PostId = response.PostId;

            return map;
        }

        public async Task<IEnumerable<T>> GetAllNewsAsync<T>()
        {
            var posts = _postRepository.GetAllPosts<NewsEntity>();
            return posts.Select(Mapper.Map<NewsEntity, T>);
        }

        public async Task<IEnumerable<PostPreview>> GetLatestNewsByCategoryUrlAsync(string categoryUrl, bool onMainPage = false, int limit = 10)
        {
            return (await _postRepository
                .GetLatestPostsByCategoryUrlAsync<NewsEntity>(categoryUrl, limit))
                .Select(Mapper.Map<NewsEntity, PostPreview>);
        }

        public async Task<IEnumerable<PostPreview>> GetPagedLatestNewsByCategoryUrlAsync(string categoryUrl, int limit = 10, int page = 1)
        {
            return (await _postRepository
                .GetPagedLatestPostsByCategoryUrlAsync<NewsEntity>(categoryUrl, limit, page))
                .Select(Mapper.Map<NewsEntity, PostPreview>);
        }

        public async Task<IEnumerable<PostPreview>> GetAllNewsByTagNameAsync(string tagName)
        {
            var posts = await _postRepository.GetAllPostsByTagNameAsync<NewsEntity>(tagName);
            return posts.Select(Mapper.Map<PostEntity, PostPreview>);
        }

        public async Task<News> GetNewsByIdAsync(int id)
        {
            return Mapper.Map<PostEntity, News>(await _postRepository.GetPostByIdAsync<NewsEntity>(id));
        }

        public async Task<int> GetTotalNumberOfNewsByTagAsync(string tag)
        {
            return await _newsRepository.GetTotalNumberOfNewsByTagAsync(tag);
        }

        public async Task<int> GetTotalNumberOfNewsByCategoryUrlAsync(string categoryUrl)
        {
            return await _newsRepository.GetTotalNumberOfNewsByCategoryUrlAsync(categoryUrl);
        }

        public async Task<int> GetTotalNumberOfNewsAsync()
        {
            return await _newsRepository.GetTotalNumberOfNewsAsync();
        }

        public async Task<IEnumerable<PostPreview>> GetLatestNewsAsync(int limit)
        {
            var posts = await _newsRepository.GetLatestNewsAsync(limit);
            return posts.Select(Mapper.Map<NewsEntity, PostPreview>);
        }

        public async Task<News> UpdateNewsAsync(News post)
        {
            NewsEntity newPost = Mapper.Map<News, NewsEntity>(post);
            newPost.CategoryId = newPost.Category.CategoryId;
            var result = await _postRepository.UpdatePostAsync<NewsEntity>(newPost);
            return Mapper.Map<NewsEntity, News>(result);
        }
        public async Task UpdateNewsAsync(IEnumerable<News> posts)
        {
            await _postRepository.UpdatePostAsync<NewsEntity>(posts.Select(Mapper.Map<News, NewsEntity>));
        }

        public async Task RemoveNewsAsync(int id)
        {
            await _postRepository.RemovePostAsync(id);
        }

        public async Task RemoveNewsAsync(IEnumerable<int> id)
        {
            await _postRepository.RemovePostAsync(id);
        }

        public async Task<IEnumerable<PostPreview>> GetPopularNewsByCategoryUrlAsync(string categoryUrl, int limit)
        {
            var posts = await _postRepository.GetPopularPostsByCategoryUrlAsync<NewsEntity>(categoryUrl, limit);
            return posts.Select(Mapper.Map<PostEntity, PostPreview>);
        }

        public async Task<IEnumerable<PostPreview>> GetImportantNewsAsync(int limit)
        {
            var posts = await _newsRepository.GetImportantNewsAsync(limit);
            var test = posts.Select(Mapper.Map<PostEntity, PostPreview>);
            return test;
        }

        public async Task AddTagToNewsAsync(int postId, string tagName)
        {
            var postTags = await _postRepository.GetAllTagsByPostIdAsync(postId);
            var tag = await _tagService.GetTagByNameAsync(tagName) ?? await _tagService.AddTagAsync(new Tag { Name = tagName });
            if (!postTags.Select(s => s.Name).Contains(tagName))
            {
                await _postRepository.AddTagToPostAsync(postId, Mapper.Map<Tag, TagEntity>(tag));
            }
        }

        public async Task AddTagsToNewsAsync(int postId, IEnumerable<string> tags)
        {
            if (tags != null)
            {
                var postTags = await _postRepository.GetAllTagsByPostIdAsync(postId);
                foreach(var t in tags)
                {
                    var tag = await _tagService.GetTagByNameAsync(t) ?? await _tagService.AddTagAsync(new Tag { Name = t });
                    if (!postTags.Select(s => s.Name).Contains(t))
                    {
                        await _postRepository.AddTagToPostAsync(postId, Mapper.Map<Tag, TagEntity>(tag));
                    }
                }
                postTags.Where(pt => !tags.Contains(pt.Name)).ToList().ForEach(async pt => await _postRepository.RemoveTagFromPostAsync(postId, pt));
            } 
        }

        public async Task<IEnumerable<Tag>> GetAllTagsByNewsIdAsync(int id)
        {
            List<TagEntity> tags = await _postRepository.GetAllTagsByPostIdAsync(id) ?? new List<TagEntity>();
            return tags.Select(Mapper.Map<TagEntity, Tag>);
        }

        public async Task<IEnumerable<PostPreview>> GetSideNewsAsync(int limit)
        {
            var result = await _newsRepository.GetSideNewsAsync(limit);
            return result.Select(Mapper.Map<NewsEntity, PostPreview>);
        }

        public async Task<IEnumerable<PostPreview>> GetSliderNewsAsync(int limit)
        {
            var result = await _newsRepository.GetSliderNewsAsync(limit);
            return result.Select(Mapper.Map<NewsEntity, PostPreview>);
        }
    }
}
