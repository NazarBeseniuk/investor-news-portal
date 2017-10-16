﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Investor.Entity;
using Investor.Model;

namespace Investor.Service.Interfaces
{
    public interface IBlogService
    {
        Task<IEnumerable<BlogPreview>> GetLatestBlogsAsync(int limit = 10);
        Task<IEnumerable<BlogPreview>> GetPopularBlogsAsync(int limit = 3); 
    }
}