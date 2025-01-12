const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();
const axios = require('axios');
const routes = require("./routes/client/index.route");
const routesAdmin = require("./routes/admin/index.route");

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'));

const database = require("./config/database");
database.connect();

const configSystem = require("./config/system");
const { STATUS_CODES } = require('http');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// Flash
app.use(cookieParser('VANCHIKHANH'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.use(express.static(`${__dirname}/public`));

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// App Locals variables
app.locals.preFixAdmin = configSystem.prefixAdmin;

// Routes
routes(app);
routesAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Payment endpoint
app.post("/payment", async (req, res) => {
    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var orderInfo = 'pay with MoMo';
    var partnerCode = 'MOMO';
    var redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    var requestType = "payWithMethod";
    var amount = '14400000'; 
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = '';
    var orderGroupId = '';
    var autoCapture = true;
    var lang = 'vi';

    // Raw signature
    var rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);

    // Generate signature
    const crypto = require('crypto');
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    // Prepare request body
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature
    });

    // Options for axios
    const options = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/create",
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        },
        data: requestBody
    };

    try {
        // Send request to MoMo
        let result = await axios(options);
        // Check if the response includes a payment URL
        if (result.data && result.data.payUrl) {
            return res.status(200).json({ payUrl: result.data.payUrl });
        } else {
            return res.status(400).json({ message: "Không nhận được URL thanh toán từ MoMo." });
        }
    } catch (error) {
        console.error("Error calling MoMo:", error);
        return res.status(500).json({
            STATUS_CODES: 500,
            message: "server error"
        });
    }
});