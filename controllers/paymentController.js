const crypto = require('crypto');

exports.handleSuccess = (req, res) => {
    res.status(200).send('Payment successful!');
};

exports.handleFail = (req, res) => {
    res.status(200).send('Payment failed.');
};

exports.handleResult = (req, res) => {
    const { EDP_BILL_NO, EDP_REC_ACCOUNT, EDP_AMOUNT, EDP_TRANS_ID, SIGNATURE } = req.body;

    const SECRET_KEY = process.env.SECRET_KEY;
    const generatedSignature = crypto
        .createHash('md5')
        .update(`${EDP_BILL_NO}:${EDP_AMOUNT}:${SECRET_KEY}:${EDP_REC_ACCOUNT}:${EDP_TRANS_ID}`)
        .digest('hex');

    if (generatedSignature === SIGNATURE) {
        res.status(200).send('Result received and verified.');
    } else {
        res.status(400).send('Invalid signature.');
    }
};
