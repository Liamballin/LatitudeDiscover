var network;
	var nodes;
	var edges;
	var newRoot;

	function renderNew(data){
		var parse = []
		var edg = []
		for(i = 0; i < data.length;i++){
			var newOb = {};
			newOb.id = data[i].id;
			newOb.label = data[i].name+"\n"+data[i].genres[0];
			newOb.group = data[i].genres[0];
			if(data[i].images[0] != undefined){
				newOb.image = data[i].images[0].url;
			}else{
				newOb.image ="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyG1pllAcOZLO2j7zgS9IceYndTwS-BKpi7Gwam95nowy_a7sl"
			}
			newOb.shape = "circularImage"
			parse.push(newOb)

			var link = {from:newRoot, to: data[i].id}
			edg.push(link)
		}
		parse.push({id:0, label:"ROOT"})

		nodes.update(parse);
		edges.update(edg)

	}

	function render(data){

		console.log(data)
		// create an array with nodes
		// var nodes = new vis.DataSet([
		//   { id: 1, label: "Node 1" },
		//   { id: 2, label: "Node 2" },
		//   { id: 3, label: "Node 3" },
		//   { id: 4, label: "Node 4" },
		//   { id: 5, label: "Node 5" }
		// ]);

		var parse = []
		var edg = []
		for(i = 0; i < data.length;i++){
			var newOb = {};
			var newOb = {};
			newOb.id = data[i].id;
			newOb.label = data[i].name+"\n"+data[i].genres[0];
			newOb.group = data[i].genres[0];
			newOb.exploded = false;
			if(data[i].images[0] != undefined){
				newOb.image = data[i].images[0].url;
			}else{
				newOb.image ="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyG1pllAcOZLO2j7zgS9IceYndTwS-BKpi7Gwam95nowy_a7sl"
			}
			newOb.shape = "circularImage"
			parse.push(newOb)

			var link = {from:0, to: data[i].id}
			edg.push(link)
		}
		parse.push({id:0, label:"ROOT"})

		 nodes = new vis.DataSet(parse);
		 edges = new vis.DataSet(edg);
	  
		// create an array with edges

	  
		// create a network
		var container = document.getElementById("mynetwork");
		var data = {
		  nodes: nodes,
		  edges: edges
		};
		var options = {
			nodes: {
				// shape: 'image',
				borderWidth:10,
			},
			layout: {
				improvedLayout: false
			}
		}
		
		network = new vis.Network(container, data, options);

		network.on( 'click', function(properties) {
		var ids = properties.nodes;
		var clickedNodes = nodes.get(ids);
		console.log('clicked nodes:', clickedNodes);
		loadPreview(clickedNodes[0].id)
		if(!clickedNodes[0].exploded){
			newRoot = clickedNodes[0].id;
			loadNewArtist(clickedNodes[0].id)
			// clickedNodes[0].exploded = true;
			nodes.update({id: clickedNodes[0].id, exploded: true});

		}else{
			console.log("Already exploded")
		}


		});
	}