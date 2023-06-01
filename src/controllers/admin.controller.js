const BaseController = require('./base.controller');
const productModel = require('./../models/product.model');

class AdminController {
    static async handlerAdmin(req, res) {
        if (req.method === "GET") {
            let html = await BaseController.readFileData('./src/views/Admin/AdminHomePage.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        }
    }
    static async handlerProductByAdmin(req, res) {
        let products = await productModel.getAllProduct();
        let newHtml = '';
        products.forEach((product) => {
          newHtml += `<tr>`;
          newHtml += `<td>${product.pID}</td>`;
          newHtml += `<td>${product.pName}</td>`;
          newHtml += `<td>${parseInt(product.pPrice).toLocaleString()}</td>`;
          newHtml += `<td>${product.pQuantity}</td>`;
          newHtml += `<td>${product.pSize}</td>`;
          newHtml += `<td><button>Sửa</button>
                     <button>Xóa</button></td>`;
        })
        let html = await BaseController.readFileData('./src/views/admin/productManager.html');
        html = html.replace('{product-data}', newHtml);
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(html);
        res.end();
    }
}
module.exports = AdminController;
