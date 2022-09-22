var express = require("express");
var app = new express();
var request = require("request");
var server_port = 4000;
var my_api_key = "888e1bae53f6445c8c7a762df5510430";
var api_url = "https://newsapi.org/v2/everything?q=microsoft&from=2021-08-17&sortBy=publishedAt&apiKey="+my_api_key;


app.listen(server_port, function(){

	console.log("Server started on port : " + server_port);
});
app.get("/", function(expReq, expRes){

	request({
		uri: api_url,
		method: 'GET'
	},
	  function(err,res,body){
	  	console.log(body);
	  	var data = JSON.parse(body);

	  		var finalResponse = `<style>
	  							 table thead th{
	  							 	background-color: #a7d6fc;
	  							 	color: #020801;
	  							 }
	  							 </style>
	  							 <table>
	  							 <thead>
	  							 <th>
	  							 Thumbnail
	  							 </th>
	  							 <th>
	  							 Title
	  							 </th>
	  							 <th>
	  							 Description
	  							 </th>
	  							 <th>
	  							 News URL
	  							 </th>
	  							 <th>
	  							 Author
	  							 </th>
	  							 <th>
	  							 publishedAt
	  							 </th>
	  							 <th>
	  							 Contant
	  							 </th>
								 </thead><tbody>`;

								 data = data.articles;

								 for (var rec in data ) {
								 	finalResponse += `
								 					 <tr>
								 					 <td>
								 					 <img src="${data[rec].urlToImage}" style="width:200px;" />
								 					 </td>
								 					 <td>
								 					 ${data[rec].title}
								 					 </td>
								 					 <td>
								 					 ${data[rec].description}
								 					 </td>
								 					 <td>
								 					 <a href="${data[rec].url}" target="_blank">${data[rec].url}</a>
								 					 </td>
								 					 <td>
								 					 ${data[rec].author}
								 					 </td>
								 					 <td>
								 					 ${data[rec].publishedAt}
								 					 </td>
								 					 <td>
								 					 ${data[rec].content}
								 					 </td>
								 					 </tr>`;
								 					 
 								 }

 								 finalResponse += `</tbody></table></body></html>`;
 								 expRes.send(finalResponse);
 								});

});