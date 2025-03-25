const crypto = require('crypto');
const pool = require('../config/db');

exports.handleSuccess = (req, res) => {
    res.status(200).send('Payment successful!');
};

exports.handleFail = (req, res) => {
    res.status(200).send('Payment failed.');
};

exports.handleResult = (req, res) => {
    const {
        EDP_PRECHECK,
        EDP_BILL_NO,
        EDP_REC_ACCOUNT,
        EDP_AMOUNT,
        EDP_PAYER_ACCOUNT,
        EDP_TRANS_ID,
        EDP_TRANS_DATE,
        EDP_CHECKSUM,
      } = req.body;
      const { IDRAM_EDP_REC_ACCOUNT, IDRAM_SECRET_KEY } = process.env;

      const [result] = pool.query('SELECT * FROM orders WHERE id = ? AND payment_type IS NULL',[EDP_BILL_NO])
    
      if (EDP_PRECHECK == "YES") {
        return result?.id && EDP_REC_ACCOUNT == IDRAM_EDP_REC_ACCOUNT
          ? res.status(200).send('OK') 
          : res.status(200).send('');
      } else {
        const concatParts = `${IDRAM_EDP_REC_ACCOUNT}:${EDP_AMOUNT}:${IDRAM_SECRET_KEY}:${EDP_BILL_NO}:${EDP_PAYER_ACCOUNT}:${EDP_TRANS_ID}:${EDP_TRANS_DATE}`;
        const checksum = crypto.createHash("md5")
        .update(concatParts)
        .digest("hex")
        .toUpperCase();
         if (EDP_CHECKSUM === checksum) {
           pool.query('UPDATE orders SET payment_type = ? WHERE id = ?',['idram',EDP_BILL_NO ]);
           return res.status(200).send('OK')
        } 

       return res.status(200).send('')
      }
};
