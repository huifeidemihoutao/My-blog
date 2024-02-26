type BusClass={
logThis:()=>void,
logjiantouthis:Function

}


class Bus{
//state:any=
List:any[]=[]
on (name:string,fn:Function){
    this.List.push({name:name,fn:fn})
}
emit(name:string,...rest:any[]){
  this.List.forEach(item=>{
      if(item.name==name){
        item.fn(...rest)
      }
  })
}

off(name:string){
    this.List.forEach((item,index)=>{
        if(item.name==name){
          this.List.splice(index,1)
        }
    })
}




}

let CC=new Bus

export default CC