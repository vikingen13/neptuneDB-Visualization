const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const P = gremlin.process.P
const t = gremlin.process.t

const Order = gremlin.process.order
const Scope = gremlin.process.scope
const Column = gremlin.process.column
const __ = gremlin.process.statics


exports.handler = async (event, context, callback) => {
    const dc = new DriverRemoteConnection(`wss://${process.env.NEPTUNE_ENDPOINT}:${process.env.NEPTUNE_PORT}/gremlin`,{});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);
    try {
        const result = await g.V().toList()
        const vertex =  result.map(r => {
            return {'id':r.id,'label':r.label}
        })
        const result2 = await g.E().toList()
        const edge = result2.map(r => {
            console.log(r)
            return {"source": r.outV.id,"target": r.inV.id,'value':r.label}
        })
        
        return {statusCode: 200,
                headers: {
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
                  },        
                body: JSON.stringify({'nodes':vertex,"edges":edge,})
        }
      } catch (error) {
        console.error(JSON.stringify(error))
        return { error: error.message }
      }
}
