import { Category } from "./models/categoryModel.js";
import {User} from  "./models/userModel.js";
import { connectDB } from "./app.js";

const predefinedCategories = [
    { name: 'Project' }, 
    { name: 'Study' }, 
    { name: 'Work' }, 
    { name: 'Personal' }, 
    { name: 'Health' }, 
    { name: 'Household' }, 
    { name: 'Finances' }, 
    { name: 'Social' }, 
    { name: 'Errands' },
];

const seedCategories = async(req,res) => {

    await connectDB();
    const user = await User.findOne();

    if(!user){
        return res.status(400).json({message:'User not found!'})
    }

    for( const categories of  predefinedCategories){
        const newCategory = new Category({
            ...categories,
            user:user._id
        })

        await newCategory.save();
    }
console.log('Categories Seeded!')
process.exit(0);

}

seedCategories();