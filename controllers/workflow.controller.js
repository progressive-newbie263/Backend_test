import dayjs from 'dayjs';
//code dưới đây là cách import serve vào. cách import thông thường/trực tiếp sẽ ko 
// hoạt động được. Lí do: Lỗi do serve không phải export của ESModule.
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

import Subscription from '../models/subscription.model.js';

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async(context) => {
  //khi kích hoạt strict workflow, yêu cầu load request phải có id của subscription
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  //ko có subscription hoặc subscription ko trong trạng thái hoạt động thì trả về luôn.
  if(!subscription || subscription.status !== 'active') return;

  const renewalDate = dayjs(subscription.renewalDate);

  if(renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date has passed for subscription ${subscription}. Stopping workflow.`);
    return;
  }

  //map qua tất cả các ngày trong REMINDERS. Từ đó, đưa ra khi nào cần kích hoạt msg? Khi nào cho nó ngủ/chờ...
  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'days');
    //REMINDERS = [7,5,2,1] 
    // => if todayDate = march26 => renewalDate = march19, 21, 24, 25.

    if(reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
    }

    await triggerReminder(context, `Reminder ${daysBefore} days before`);
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  //cần 2 cái return. Nếu ko nó trả về undefined, do req ko có gì?
  return await context.run('Get subscription', async() => {
    return Subscription.findById(subscriptionId).populate('user', 'name email');
  })
}

//function này sẽ chờ cho đến khi nhắc nhở tái đăng kí.
//mở rộng hơn: Này có thể là bất cứ gì, ko chỉ bị giới hạn ở func. Thuật toán, kết cấu,....
const sleepUntilReminder = async(context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  
  await context.sleepUntil(label, date.toDate());
}

//function này sẽ gửi nhắc nhở khi thời hạn đki đến. Kết hợp vs func sleep ở trên.
const triggerReminder = async(context, label) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);

    //gửi email/sms/notification... nhắc nhở
  })
}