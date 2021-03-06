﻿let tables = {};
let tablesUpdetedData = {};
//let chosenPostsIds = [];

$(document).ready(function () {
});

$(document).on('change',
	'tbody td:not(:first-child)',
	function (e) {

		const tableId = "#" + $(this).closest('table').prop("id");
		const idx = tables[tableId].cell(this).index().column;

		const tableDataObj = tables[tableId].row($(this).parents('tr')).data();
		const propertyName = tables[tableId].settings().init().columns[idx].data;
		const properyValue = $(e.target).prop("checked");

		if (tablesUpdetedData[tableDataObj.postId]) {
			tablesUpdetedData[tableDataObj.postId][propertyName] = properyValue;
		} else {
			tablesUpdetedData[tableDataObj.postId] = tableDataObj;
			tablesUpdetedData[tableDataObj.postId][propertyName] = properyValue;
		}
		console.log(tableDataObj.postId);
		console.log(tablesUpdetedData);

	});

$(document).on("click", "a.nav-link", function (e) {
	
	const url = $(this).data("href");
	const type = $(this).data("type");
	if (type && type === "news") {
		tablesUpdetedData = {};
		getPartialView(`admin${url}`, initialTable, "#newsTable");
	}

	if (type && type === "update") {

		let tempArray = [];
		const keys = Object.keys(tablesUpdetedData);

		for (let i = 0; i < keys.length; i += 1) {
			tempArray.push(tablesUpdetedData[keys[i]]);
		}
		console.log(tempArray);
		updetePosts.call(this, url, tempArray);

	}
	if (type && type === "singlepost") {
		getPartialView(`admin${url}`, function () { initTypeahead(); $("#updateFormSubmit").data("action", "UpdatePost");});
	}
	if (type && type === "create") {
		getPartialView(`admin${url}`, function () { initTypeahead(); $("#updateFormSubmit").data("action", "CreatePost");});
	}
	if (type && type === "singleblog") {
		getPartialView(`admin${url}`, function () { initTypeahead(); $("#updateFormBlogSubmit").data("action", "UpdatePost"); });
	}
	if (type && type === "createblog") {
		getPartialView(`admin${url}`, function () { initTypeahead(); $("#updateFormBlogSubmit").data("action", "CreatePost");});
	}

});

let updetePosts = function (url, postData) {
	console.log(postData);
	$.ajax({
		url: url,
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		dataType: 'json',
		type: "POST",
		data: { tablePosts: postData },
		success: function (data) {
			console.log(data);
		}
	});
}

let initialTable = function (tableId) {

	tables[tableId] = $(tableId).DataTable({

		"ajax": "/api/Content/GetAllNews",
		"columns": [
			{
				data: null,
				orderable: false,
				render: function () {
					return `<div class="text-center"><input type="checkbox" class="md-check"></div>`
				}
			},
			{
				"data": "postId",
				"visible": false,
				render: function (data, type, full, meta) {
					return data;
				}

			},
			{
				"data": "title",
				render: function (data, type, full) {
					return `<a href="#" data-type="singlepost" class="nav-link" data-href="/content/singlepost/${full.postId}">${data}</a>`
				}

			},
			{
				"data": "publishedOn",
				render: function (data, type, full, meta) {
					return moment(data).format("DD.MM.YYYY HH:mm");
				}
			},
			{ "data": "category.name" },
			{
				"data": "isPublished",
				render: function (data, type, full, meta) {
					return `<div class="text-center"><input data-name="IsPublished" type="checkbox" ${data ? "checked" : ""} class="md-check"></div>`;
				}
			},
			{
				"data": "isOnMainPage",
				render: function (data, type, full, meta) {
					return `<div class="text-center"><input data-name="IsOnMainPage" type="checkbox" ${data ? "checked" : ""} class="md-check"></div>`;
				}
			},
			{
				"data": "isImportant",
				render: function (data, type, full, meta) {
					return `<div class="text-center"><input data-name="IsImportant" type="checkbox" ${data ? "checked" : ""} class="md-check"></div>`;
				}
			}
		]
	});
}

let getPartialView = function (url, callback = undefined, tableId = undefined) {
	$.ajax({
		url: url,
		type: "GET",
		success: function (data) {
			$("#container").empty();
			$("#container").append(data);
			chosenPostsIds = [];
			if (callback) {
				callback(tableId);
			}
		}
	});
};