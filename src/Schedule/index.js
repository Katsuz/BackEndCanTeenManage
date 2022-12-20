const schedule = require('node-schedule');
const startHour = 6;
const startMinute = 0;
const endHour = 15;
const endMinute = 0;
const dateOpen = [1, 2, 3, 4, 5, 6]; //monday-saturday
var isReseted = false;
const { Product } = require('../Database/Model');
const { OnSell } = require('../Database/Model');
let ruleStart = new schedule.RecurrenceRule();
ruleStart.tz = 'Asia/Saigon';
ruleStart.second = 0;
ruleStart.minute = 0;
ruleStart.hour = 6;
let ruleEnd = new schedule.RecurrenceRule();
ruleEnd.tz = 'Asia/Saigon';
ruleEnd.second = 0;
ruleEnd.minute = 10;
ruleEnd.hour = 15;

class CanteenSchedule {

    async run() {
        const start = schedule.scheduleJob(ruleStart, async function () {
            console.log('Reset product of today!');

            let today = new Date();
            today = today.getDay();
            //today = 6;
            //console.log(today);

            let deleteO = await OnSell.deleteMany({}); //Reset lai danh sach hang hoa hom nay
            //console.log(deleteO);

            let findPFood = await Product.find({ daysell: today });

            for (let i = 0; i < findPFood.length; i++) {
                let item = {
                    product: findPFood[i]._id,
                    quantity: findPFood[i].total
                }

                let newOnSell = new OnSell(item);
                let saveN = await newOnSell.save();
            };

            if (today != 0) {
                let findPFastFood = await Product.find({ type: { $in: ["cake", "gas", "noGas"] }, total: { $gt: 0 } });

                for (let i = 0; i < findPFastFood.length; i++) {
                    let item = {
                        product: findPFastFood[i]._id,
                        quantity: findPFastFood[i].total
                    }

                    let newOnSell = new OnSell(item);
                    let saveN = await newOnSell.save();
                };
                let deleteO = await OnSell.deleteMany({}); //Reset lai danh sach hang hoa hom nay
            }
        });
        const end = schedule.scheduleJob(ruleEnd, async function () {
            console.log('Close!');

            let findOnSell = await OnSell.find({});

            for (let i = 0; i < findOnSell.length; i++) {
                findOnSell[i].quantity = 0;
                await findOnSell[i].save();
            }
            let deleteO = await OnSell.deleteMany({}); //Reset lai danh sach hang hoa hom nay
        });

        if (isReseted == false) {

            isReseted = true;
            console.log('Reset product of today!');

            let today = new Date();
            today = today.getDay();
            //today = 6;
            //console.log(today);

            let deleteO = await OnSell.deleteMany({}); //Reset lai danh sach hang hoa hom nay
            

            let findPFood = await Product.find({ daysell: today });

            for (let i = 0; i < findPFood.length; i++) {
                let item = {
                    product: findPFood[i]._id,
                    quantity: findPFood[i].total
                }

                let newOnSell = new OnSell(item);
                let saveN = await newOnSell.save();
            };

            if (today != 0) {
                let findPFastFood = await Product.find({ type: { $in: ["cake", "gas", "noGas"] }, total: { $gt: 0 } });

                for (let i = 0; i < findPFastFood.length; i++) {
                    let item = {
                        product: findPFastFood[i]._id,
                        quantity: findPFastFood[i].total
                    }

                    let newOnSell = new OnSell(item);
                    let saveN = await newOnSell.save();
                };
            }
        }
    }

}

module.exports = new CanteenSchedule;