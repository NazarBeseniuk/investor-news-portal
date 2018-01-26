﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Investor.Model;
using Investor.Service.Interfaces;
using Investor.Service.Utils.Interfaces;
using Investor.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Investor.Web.Areas.Admin.Controllers.API
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class BlogsApi : Controller
    {
        private readonly ICategoryService _categoryService;
        private readonly IBlogService _blogService;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public BlogsApi(IBlogService blogService, ICategoryService categoryService, IImageService imageService, IMapper mapper)
        {

            _blogService = blogService;
            _categoryService = categoryService;
            _imageService = imageService;
            _mapper = mapper;
        }

        [Route("GetAllBlogs")]
        [HttpGet]
        public async Task<IActionResult> GetAllBlogs()
        {
            IEnumerable<TableBlogPreview> result = await _blogService.GetAllBlogsAsync<TableBlogPreview>();
            return Json(new { data = result });
        }

        [Route("UpdateBlog")]
        [HttpPost]
        public JsonResult UpdateBlog([FromForm]BlogViewModel post, [FromForm]IFormFile image)
        {
            post.Image = image != null ? _imageService.SaveImage(image) : null;
            //_blogService.AddTagsToBlogAsync(post.PostId, post.Tags).Wait();
            var newBlog = _mapper.Map<BlogViewModel, Blog>(post);
            var result = _blogService.UpdateBlogAsync(newBlog).Result;
            return Json(new { id = result.PostId, href = $"{(result.IsPublished ? "" : "/unpublished")}/blog{(result.IsPublished ? "/page" : "")}/{result.PostId}" });
        }

        [Route("UpdateTableBlogs")]
        [HttpPost]
        public async Task<JsonResult> UpdateTableBlogs(List<TableBlogPreview> content)
        {
            await _blogService.UpdateBlogAsync<TableBlogPreview>(content);
            return Json(new { success = true });
        }

        [Route("DeleteBlog")]
        [HttpPost]
        public async Task<JsonResult> DeleteBlog(List<int> id)
        {
            await _blogService.RemoveBlogAsync(id);
            return Json(new { success = true });
        }
    }
}
