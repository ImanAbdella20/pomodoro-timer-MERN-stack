import { Category } from "../models/categoryModel.js";

export const getCategories = async (req,res) => {
   let getAllCategories;
try {
 getAllCategories = await Category.find({user:req.user._id}); 
    if(getAllCategories){
        return res.status(200).json(getAllCategories);
    }
} catch (error) {
     return res.status(500).json({ message: "An error occurred" });
}   
}


export const getCategoryById = async(req,res) =>{
    const categoryId = req.params.id;
    let category;
    try {
        category = await Category.findById(categoryId);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }

    if (!category) {
        return res.status(400).json({ message: "Category not found" });
    }
    return res.status(200).json({ category });
}