export default function crudRepo(model){
  return {

    create: async function (data){
      const newDoc = await model.create(data);
      return newDoc;
    },
    
    getAll: async function (){
      const allDocs = await model.find();
      return allDocs;
    },

    getById: async function (id){
      const getDocs = await model.findById(id);
      return getDocs;
    },
    delete: async function (id){
      const response = await model.destroy(id);
      return response;
    },
    update: async function (id , data){
      const updateDoc = await model.Update(id , data , {
        new : true
      });
      return updateDoc;
    }

  }
}