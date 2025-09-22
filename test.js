const { MongoClient } = require('mongodb');

// 连接 URL
const url = 'mongodb://justonice:ylq787817899..@121.41.11.76:27800';
const client = new MongoClient(url);
const qs = require('qs')
console.log(qs.stringify({$expr: {
        $or: [
            { $eq: [{ $toString: '$carbs' }, '3'] },  // 将数字转换为字符串比较
            { $eq: [{ $toInt: '$carbs' }, 2] }        // 将字符串转换为数字比较
        ]
    }}))
async function main() {
    try {
        // 连接到服务器
        await client.connect();
        console.log('Connected successfully to server');

        const database = client.db('nightscout'); // 选择数据库
        const collection = database.collection('treatments'); // 选择集合

        // 插入一个文档
        // const insertResult = await collection.insertOne({ item: 'test', quantity: 1 });
        // console.log('Inserted document:', JSON.stringify(insertResult.ops[0], null, 2));
/*
{
  "$or": [
    {
      "$eq": [
        {
          "$toString": "$carbs"
        },
        "3"
      ]
    },
    {
      "$eq": [
        {
          "$toString": "$carbs"
        },
        "2"
      ]
    }
  ]
}
* */
        const query = {
            notes_mealsTime: {
                $nq: null
            },
        }
        console.log(qs.stringify(query))
        // 查询文档
        const findResult = await collection.find().sort({ created_at: -1 }).skip(0).limit(5).toArray();



        console.log('Found documents:', JSON.stringify(findResult, null, 2));
        //
        // // 更新文档
        // const updateResult = await collection.updateOne(
        //     { item: 'test' },
        //     { $set: { quantity: 2 } }
        // );
        // console.log('Updated document count:', updateResult.modifiedCount);
        //
        // // 查询更新后的文档
        // const updatedFindResult = await collection.find({}).toArray();
        // console.log('Updated documents:', JSON.stringify(updatedFindResult, null, 2));

        // 删除文档
        // const deleteResult = await collection.deleteOne({ item: 'test' });
        // console.log('Deleted document count:', deleteResult.deletedCount);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        // 关闭连接
        await client.close();
    }
}

main().catch(console.error);