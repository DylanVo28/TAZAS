class APIFeatures{
    constructor(query,queryStr){
        this.query=query
        this.queryStr=queryStr
    }
    sort(){
        this.query=this.query.find().sort({createdAt:-1})
        return this
    }
    search(){
        const keyword=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:'i'
            }
        }:{}
        this.query=this.query.find({...keyword})
        return this
    }
    filter(){
        //update comming
       const queryCopy={...this.queryStr}
       const removeFields=['keyword','limit','page']
       removeFields.forEach(el=>delete queryCopy[el])
        if(queryCopy.category==''){
            delete queryCopy['category']
        }
       this.query=this.query.find(queryCopy)
       return this
    }
    pagination(resPerPage){
        const currentPage=Number(this.queryStr.page)||1;
        const skip=resPerPage*(currentPage-1);
        this.query=this.query.limit(resPerPage).skip(skip)
        return this
    }
}
module.exports=APIFeatures