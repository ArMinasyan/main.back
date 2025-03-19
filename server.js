const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const NODE_ENV = process.env.NODE_ENV || 'development';

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;
const isProduction = NODE_ENV === 'production';

const BASE_URL = isProduction ? 'https://academy-polyglot.site' : 'http://localhost:5001';

const SUCCESS_URL = `${BASE_URL}/success`;
const RESULT_URL = `${BASE_URL}/result`;
const FAIL_URL = `${BASE_URL}/fail`;

console.log(`✅ Base URL: ${BASE_URL}`);
console.log(`✅ Success URL: ${SUCCESS_URL}`);
console.log(`✅ Result URL: ${RESULT_URL}`);
console.log(`✅ Fail URL: ${FAIL_URL}`);

// CORS middleware - բոլոր հարցումները թույլատրելու համար
app.use((req, res, next) => {
    const origin = req.headers.origin;
    console.log('🟡 Incoming Origin:', origin);

    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

// Վերանայեք այս տողը - այն կարող է վնասել նախորդ CORS կարգավորումները
// app.use(cors(corsOptions));

app.use(express.json());

// ✅ Static files (Նկարներ)
app.use('/picture', express.static(path.join(__dirname, 'picture')));

// ✅ API ռոութեր
app.use('/api', require('./routes/commentRoutes'));
app.use('/api', require('./routes/teacherRoutes'));
app.use('/api', require('./routes/contactRoutes'));
app.use('/api', require('./routes/newsletterRoutes'));
app.use('/api', require('./routes/myteamRoutes'));
app.use('/api', require('./routes/orderRoutes'));
app.use('/api', require('./routes/productRoutes'));
app.use('/api', require('./routes/imageRoutes'));
app.use('/api', require('./routes/galleryRoutes'));
app.use('/api', require('./routes/paymentRoutes'));

// ✅ Success & Fail Routes
app.get('/success', (req, res) => res.send('Payment Successful!'));
app.get('/result', (req, res) => res.send('Payment Result Callback!'));
app.get('/fail', (req, res) => res.send('Payment Failed. Please try again.'));

// ✅ Payment API - Օրինակ վճարման հարցում
app.post('/api/payment', (req, res) => {
    try {
        const { amount, billNo } = req.body;

        if (!amount || !billNo) {
            return res.status(400).json({
                success: false,
                error: 'Missing required payment information'
            });
        }

        // Վճարման տրամաբանություն
        const internalPaymentData = {
            amount,
            billNo,
            secretKey: SECRET_KEY,
            timestamp: Date.now()
        };

        console.log('Processing payment:', internalPaymentData);

        return res.status(200).json({
            success: true,
            message: 'Payment processed successfully',
            transactionInfo: { amount, billNo }
        });
    } catch (error) {
        console.error('Payment processing error:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while processing the payment'
        });
    }
});

// ✅ Սերվերի գործարկում
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});