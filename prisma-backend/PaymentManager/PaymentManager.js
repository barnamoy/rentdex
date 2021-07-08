const { PrismaClient } = require('@prisma/client')

class PaymentManager{
    constructor(){
        this.prisma = new PrismaClient()
    }
    async makePayment(req,res){
        try{
        let payment = await this.prisma.payment.create({
            data:{
                advertisementid: req.body.id
            }
        })
        console.log(payment)
        // call the stripe server for payment gateway call

        this.callPaymentGateway(this.body.value)



        this.handleSuccess(payment,res)
        
        }
        catch(err){
            this.handleFailure(err,res)
            
        }
        
    }
    callPaymentGateway(){

        return true;
    }
    handleSuccess(payment ,res){
        res.send(payment)
    }
    handleFailure(err,res){
        res.send(JSON.stringify({error:err}))
    }
}
module.exports = PaymentManager