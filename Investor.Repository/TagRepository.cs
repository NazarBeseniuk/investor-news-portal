﻿using Investor.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using Investor.Entity;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Investor.Repository
{
    public class TagRepository : ITagRepository
    {
        private readonly NewsContext _newsContext;

        public TagRepository(NewsContext newsContext)
        {
            _newsContext = newsContext;
        }

        public async Task<TagEntity> AddTagAsync(TagEntity tagEntity)
        {
            await _newsContext
               .Tags
               .AddAsync(tagEntity);
            await _newsContext.SaveChangesAsync();

            return tagEntity;
        }

        public async Task<IEnumerable<TagEntity>> GetAllTagsAsync()
        {
            return await _newsContext
                .Tags
                .Include(s => s.PostTags)
                .ToListAsync();
        }

        public async Task<TagEntity> GetTagByIdAsync(int id)
        {
            return await _newsContext
               .Tags
               .Include(s => s.PostTags)
               .FirstOrDefaultAsync(s => s.TagId == id);
        }

        public async Task RemoveTagAsync(int id)
        {
            TagEntity tagToRemove = await _newsContext
                .Tags
                .FirstOrDefaultAsync(p => p.TagId == id);

            _newsContext
                .Tags
                .Remove(tagToRemove);

            await _newsContext.SaveChangesAsync();
        }

        public async Task UpdateTagAsync(TagEntity tag)
        {
            _newsContext
                .Tags
                .Update(tag);

            await _newsContext.SaveChangesAsync();
        }
    }
}
