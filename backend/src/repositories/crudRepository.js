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
    
    // Fixed: Use correct Mongoose method
    delete: async function (id){
      const response = await model.findByIdAndDelete(id);
      return response;
    },
    
    // Fixed: Use correct Mongoose method and capitalization
    update: async function (id, data){
      const updateDoc = await model.findByIdAndUpdate(id, data, {
        new: true
      });
      return updateDoc;
    }
  }
}