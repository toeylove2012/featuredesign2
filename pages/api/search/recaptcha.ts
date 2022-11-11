import { NextApiRequest, NextApiResponse } from 'next';
import { RECAPTCHA_SECRET_KEY } from 'constants/index';

const sleep = () =>
  new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, 350);
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;
  const { textSearch, captcha } = body;
  if (method === 'POST') {
    if (!textSearch || !captcha) {
      return res.status(422).json({
        message: 'กรุณาพิมพ์ข้อความที่คุณต้องการค้นหา'
      });
    }

    try {
      const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captcha}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        method: 'POST'
      });

      const captchaValidation = await response.json();

      if (captchaValidation.success) {
        await sleep();
        return res.status(200).send('OK');
      }

      return res.status(422).json({
        message: 'Verify is failed, please try again later'
      });
    } catch (err) {
      console.log(err);
      return res.status(422).json({ message: 'Something went wrong, please try again later' });
    }
  }

  return res.status(404).send('Not found');
}
