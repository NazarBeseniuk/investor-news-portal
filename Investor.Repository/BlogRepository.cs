﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Investor.Entity;
using Investor.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Investor.Model.Views;

namespace Investor.Repository
{
    public class BlogRepository : IBlogRepository
    {
        private readonly NewsContext _newsContext;

        public BlogRepository(NewsContext context)
        {
            _newsContext = context;
        }
        public async Task<IEnumerable<BlogEntity>> GetLatestBlogsAsync(int limit)
        {
            var b = _newsContext.Blogs
                .Include(p => p.Author);
            var b2 = b.OrderByDescending(p => p.PublishedOn)
                .Take(limit);
            var b3 = await b2.ToListAsync();
            return b3;
        }

        public async Task<IEnumerable<BlogEntity>> GetPopularBlogsAsync(int limit)
        {
            return await _newsContext.Blogs
                .Include(p => p.Author)
                .OrderByDescending(p => p.PublishedOn)
                .Take(limit)
                .ToListAsync();
        }

        public async Task<IEnumerable<BlogEntity>> GetAllBlogsAsync()
        {
            return await _newsContext.Blogs
                .Include(p => p.Author)
                .ToListAsync();
        }

        public async Task<IEnumerable<BlogEntity>> GetBlogsByUserIdAsync(string userId)
        {
            return await _newsContext.Blogs
                .Include(p => p.Author)
                .Where(p => p.AuthorId == userId)
                .ToListAsync();
        }
  
        public async Task<int> GetNumberOfBlogsByUserId(string userId)
        {
            return await _newsContext.Blogs
                .Include(p => p.Author)
                .Where(p => p.AuthorId == userId)
                .CountAsync();
        }

        public async Task<IEnumerable<UserEntity>> GetPopularUsers(int limit)
        {
            var role = _newsContext.Roles.FirstOrDefault(r => r.Name == "bloger");
            List<UserEntity> users = await _newsContext
                .Users
                .Where(u=>_newsContext.UserRoles.Where(ur=>ur.RoleId == role.Id).Select(ur=>ur.UserId).Contains(u.Id))
                .Include(c=>c.Blogs)
                .ToListAsync();

            users = users.OrderByDescending(u => u.Blogs.Where(b => b.IsPublished ?? false).Count()).Take(limit).ToList();
            return users;
        }

        public async Task<IEnumerable<BlogEntity>> GetPagedLatestBlogsAsync(int page, int limit)
        {
            var r = await _newsContext.Blogs
                .Include(p => p.Author)
                .OrderByDescending(p => p.PublishedOn)
                .Skip(limit * (page - 1))
                .Take(limit)
                .ToListAsync();
            return r;
        }
    }
}
