let img_slider;
let img_led;
let assembly_image;
var led_color;
let power = false;
let current_ele;
let l_ele;
let x_ele;
let ib_dsp;
let ic_dsp;
let vbe_dsp;
let vce_dsp;
let extra_vce_dsp;
let extra_ib_dsp;
let record_btn;
function activity3() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    add_offcanvas_table(pp);
    input_observation_table = [];
    output_observation_table = [];
    pp.showtitle(`<p id="exp-title" style='width: 23vw;'>Input Characteristics Observations</span><p>`, 3);
    pp.showdescription(`<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: 17px;">- Click the start button. <br> - Start with Input Characterisitics. <br> - Select a V<sub>CE</sub> value and press set V<sub>CE</sub> button  <br> - Take readings for input charateristics by varying V<sub>BE</sub> and clicking the record observation button <br> - Enter the values in table and press verify <br> - Repeat record observations 4 more times to complete the Input characteristics observation table.  </div>`, 3);
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight3'));
    bsOffcanvas.show();
    let left_panel_text = `
         <div id='act3-left-content' style="position: absolute; font-size: 1.6vw;">

		    <img src='./images/circuit.webp' style='position: absolute; width: 65vw; z-index: -1; left: 30vw;' />

		 	<h3 style='text-align: center;' id='act1-sim-heading' ></h3>
            

		 	<div>
				<input type='button' value='Start' id='power-dsp' onclick='power_button();' class='btn btn-danger' style='font-size: 1.5vw; width: 20vw;' />
			</div>

			<div style='width: 80vw; display: flex; flex-direction: row; justify-content: space-evenly;'>

				<div>
					<input type='text' id='microa-dsp' style='position: absolute; right: 23.6vw; top: 3.8vw; width: 5vw; background: transparent; font-size: 1.2vw;' class='btn btn-dark' />
					<label style='position: absolute; right: 16vw; top: 3.8vw; text-align: center;'> I<sub>B</sub> (&mu;A)</label>
				</div>

				<div>
					<input type='text' id='millia-dsp' style='position: absolute; right: 1vw; top: 2vw; width: 6vw !important; font-size: 1.2vw; background: transparent;' class='btn btn-dark' />
					<label style='position: absolute; right: -7vw; top: 2vw; text-align: center;'> I<sub>C</sub> (mA)</label>
				</div>

			</div>

			<div style='width: 80vw; display: flex; flex-direction: row; justify-content: space-evenly;'>

				<div>
					<input type='text' id='vbe-dsp' style='position: absolute; right: 33.5vw; top: 16.8vw; width: 5vw; background: transparent; font-size: 1.2vw;' class='btn btn-dark' />
					<label style='position: absolute; right: 28vw; top: 16.8vw; text-align: center;'>V<sub>BE</sub></label>
				</div>

				<div>
					<input type='text' id='vce-dsp' style='position: absolute; right: -7.3vw; top: 16.8vw; width: 5vw; background: transparent; font-size: 1.2vw;' class='btn btn-dark' />
					<label style='position: absolute; right: -6vw; top: 23vw; text-align: center;'>v<sub>CE</sub></label>
				</div>

			</div>


			<div id='inp-control' style='position: absolute; font-size: 1.2vw; display: none; top: 27vw;' >
				<p>Set the V<sub>CE</sub> value and vary the V<sub>BE</sub> keeping V<sub>CE</sub> constant and record observation </p>
				V<sub>CE</sub> = <input type='text' id='extra-vce' class='form-control' style='display: inline-block; font-size: 1.2vw; width: 5vw;' disabled />

				<button class='btn btn-dark' id='fbtn1' style='display: inline-block; font-size: 1.2vw;' onclick='inp_ch_vce_inc();' >+</button>
				<button class='btn btn-dark' id='fbtn2' style='display: inline-block; font-size: 1.2vw;' onclick='inp_ch_vce_dec();' >-</button>
				<button class='btn btn-success' id='qa-we' style='display: inline-block; font-size: 1.2vw; width: 10vw;' onclick='set_first_constant();' >Set V<sub>CE</sub></button> 


				<br><br>

				<button class='btn btn-dark' id='f-plus' style='display: inline-block; font-size: 1.2vw; width: 14vw;' onclick='inp_ch_vbe_inc();' >Increase V<sub>BE</sub></button>
				<button class='btn btn-dark' id='f-minus' style='display: inline-block; font-size: 1.2vw; width: 14vw;'  onclick='inp_ch_vbe_dec();' >Decrease V<sub>BE</sub></button>
			</div>


			<div id='out-control' style='position: absolute; font-size: 1.2vw; display: none; top: 27vw;' >
				<p>Set the I<sub>B</sub> value and vary the V<sub>CE</sub> keeping I<sub>B</sub> constant and record observation </p>
				I<sub>B</sub> = <input type='text' id='extra-ib' class='form-control' style='display: inline-block; width: 140px;' disabled />

				<button class='btn btn-dark' id='sbtn1' style='display: inline-block; font-size: 1.2vw; width: 50px;' onclick='out_ch_ib_inc()' >+</button>
				<button class='btn btn-dark' id='sbtn2' style='display: inline-block; font-size: 1.2vw; width: 50px;' onclick='out_ch_ib_dec()' >-</button>
				<button class='btn btn-success' id='qa-wa' style='display: inline-block; font-size: 1.2vw; width: 10vw;' onclick='set_second_constant();' >Set I<sub>B</sub></button> 

				<br><br>

				<button class='btn btn-dark' id='s-plus'  style='display: inline-block; font-size: 1.2vw; width: 12vw;' onclick='out_ch_vce_inc()' >Increase V<sub>CE</sub></button>
				<button class='btn btn-dark' id='s-minus' style='display: inline-block; font-size: 1.2vw; width: 12vw;' onclick='out_ch_vce_dec()' >Decrease V<sub>CE</sub></button>
			</div>
			


			<div style='text-align: center;' >

				<button class='btn btn-secondary' id='record-btn' style='position: absolute; top: 40vw; font-size: 1.2vw;' disabled onclick='record_observation();' >Record Observation</button> 

			</div>

         </div>
     `;
    pp.addtoleftpannel(left_panel_text);
    //define the canvas
    pp.addcanvas('mycanvas');
    // pp.addtorightpannel(question_div_box, 3);
    pp.showscore(0, 3);
    canvas = pp.canvas;
    context = canvas.getContext('2d');
    // add rect and scene
    canvas.style.cursor = 'crosshair';
    rect = canvas.getBoundingClientRect();
    //scene = new Scene();
    // assembly_image = new Chemistry.Custome_image(
    // 	assembly,
    // 	new Chemistry.Point(1050, 450),
    // 	815 * 1.3,
    // 	635 * 1.3,
    // 	canvas
    // );
    // img_slider = new Chemistry.Custome_image(
    // 	rheostat_slider,
    // 	new Chemistry.Point(1210, 800),
    // 	41,
    // 	74,
    // 	canvas
    // );
    // scene.add(assembly_image);
    // scene.add(img_slider);
    // add canvas sizing
    window.onload = a2_windowresize;
    window.onresize = a2_windowresize;
    a2_windowresize();
    //load_colors();
    window.addEventListener('click', (event) => a3_mouseclick(event));
}
function a3_mouseclick(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
}
function a2_windowresize() {
    //canvas size
    a2_canvas_size();
    //canvas mapping
    a2_canvas_mapping();
    //draw scene
    //scene.draw();
}
function a2_canvas_size() {
    canvas.width = window.innerWidth * 0.91;
    canvas.height = ((canvas.width * 1080.0) / 1920) * 0.85;
    lscale = canvas.width / 1920.0;
    document.getElementById('leftpannel').style.height =
        canvas.height + 5 + 'px';
    document.getElementById('leftpannel').style.margin = '0';
}
function a2_canvas_mapping() {
    context.translate(0, canvas.height);
    context.scale(1, -1);
}
function add_offcanvas_table(x) {
    x.addoffcanvas(4);
    x.addoffcanvas(5);
    let bsOffcanvas4 = document.getElementById('offcanvasRight4');
    let pn = document.getElementById('pannel4');
    let btn1 = document.getElementsByClassName('offcanvasbtn')[1];
    //bsOffcanvas.show();
    //bsOffcanvas4.style.position = 'relative';
    btn1.style.top = '85px';
    btn1.style.width = '100px';
    bsOffcanvas4.style.width = '50vw';
    pn.style.height = '30vh';
    let bsOffcanvas5 = document.getElementById('offcanvasRight5');
    let pn5 = document.getElementById('pannel5');
    let btn15 = document.getElementsByClassName('offcanvasbtn')[2];
    //bsOffcanvas.show();
    //bsOffcanvas4.style.position = 'relative';
    btn15.style.top = '150px';
    btn15.style.width = '100px';
    bsOffcanvas5.style.width = '50vw';
    pn5.style.height = '30vh';
    let ele = document.getElementsByClassName('bi bi-arrow-bar-left offcanvasicon')[1];
    ele.className = '';
    ele.innerHTML = 'Output';
    let ele1 = document.getElementsByClassName('bi bi-arrow-bar-left offcanvasicon')[1];
    ele1.className = '';
    ele1.innerHTML = 'Input';
    x.showdescription(`<p id='exp-title' style='margin: auto; width: 95%;'>Output Charateristics Observation Table</span><p>`, 4);
    x.showdescription(`<p id='exp-title' style='margin: auto; width: 95%;'>Input Charateristics Observation Table</span><p>`, 5);
    x.addtorightpannel(`<div id='out_obst' ><h3 style='text-align: center;'>for I<sub>B</sub> = <span id='off-ib' ></span></h3></div>`, 4);
    x.addtorightpannel(`<div id='obst' ><h3 style='text-align: center;'>for V<sub>CE</sub> = <span id='off-vce' ></span></h3></div>`, 5);
    //add table here
    let header = [`Sr no.`, `V<sub>CE</sub> (V)`, `I<sub>C</sub> (mA)`];
    let header1 = [`Sr no.`, `V<sub>BE</sub> (V)`, `I<sub>B</sub> (&mu;A)`];
    let parent = document.getElementById('out_obst');
    let parent1 = document.getElementById('obst');
    let tab = new Verify_Rows_Cols_Custom_Fixed_Update1(header, output_observation_table, [0], [[0, 1]], '', parent, true, true, () => { }, 5);
    let tab1 = new Verify_Rows_Cols_Custom_Fixed_Update1(header1, input_observation_table, [0], [[0, 1]], '', parent1, true, true, () => { }, 5);
    tab.load_table();
    tab1.load_table();
}
function power_button() {
    let btn = document.getElementById('power-dsp');
    let btn1 = document.getElementById('record-btn');
    let heading = document.getElementById('act1-sim-heading');
    let inp_control = document.getElementById('inp-control');
    let out_control = document.getElementById('out-control');
    current_ele = document.getElementById('i-dsp');
    l_ele = document.getElementById('l-dsp');
    x_ele = document.getElementById('x-dsp');
    ib_dsp = document.getElementById('microa-dsp');
    ic_dsp = document.getElementById('millia-dsp');
    vbe_dsp = document.getElementById('vbe-dsp');
    vce_dsp = document.getElementById('vce-dsp');
    extra_vce_dsp = document.getElementById('extra-vce');
    extra_ib_dsp = document.getElementById('extra-ib');
    record_btn = document.getElementById('record-btn');
    if (mode == 0) {
        power = false;
        btn.className = 'btn btn-success';
        btn.value = 'Input Charcteristics';
        heading.innerText = 'Observe Input Characteristics';
        inp_control.style.display = 'block';
        out_control.style.display = 'none';
        btn1.onclick = record_observation;
        //display values
        vbe_dsp.value = inp_sim_vbe.toString();
        vce_dsp.value = inp_sim_vce.toString();
        ib_dsp.value = inp_sim_ib.toString();
        ic_dsp.value = '';
        mode = 1;
    }
    else if (mode == 1) {
        btn;
        power = true;
        btn.className = 'btn btn-primary';
        btn.value = 'Output Charcteristics';
        heading.innerText = 'Observe Output Characteristics';
        out_control.style.display = 'block';
        inp_control.style.display = 'none';
        btn1.onclick = record_out_observation;
        //current_ele.value = (current * (1 + (Math.random()/100))).toFixed(3);
        //l_ele.value = d.toFixed(3);
        //display values
        vbe_dsp.value = '';
        vce_dsp.value = out_sim_vce.toString();
        ib_dsp.value = out_sim_ib.toString();
        ic_dsp.value = out_sim_ic.toString();
        mode = 0;
    }
}
//controls for input charateristics
function inp_ch_vbe_dec() {
    if (inp_sim_vbe > 0) {
        inp_sim_vbe = parseFloat((inp_sim_vbe - 0.1).toFixed(1));
        update_input_display();
        record_btn.disabled = false;
    }
    else if (inp_sim_vbe == 0) {
        alert('You cannot decrease Vbe further');
        record_btn.disabled = true;
    }
}
function inp_ch_vbe_inc() {
    if (inp_sim_vbe < 1) {
        inp_sim_vbe = parseFloat((inp_sim_vbe + 0.1).toFixed(1));
        update_input_display();
        record_btn.disabled = false;
    }
    else if (inp_sim_vbe == 1) {
        alert('You cannot increase Vbe further');
        record_btn.disabled = true;
    }
}
function inp_ch_vce_dec() {
    if (inp_sim_vce > 1) {
        inp_sim_vce = inp_sim_vce - 2;
        update_input_display();
    }
    else if (inp_sim_vce == 0) {
        alert('You cannot decrease Vce further');
    }
}
function inp_ch_vce_inc() {
    if (inp_sim_vce < 8) {
        inp_sim_vce = inp_sim_vce + 2;
        update_input_display();
    }
    else if (inp_sim_vce == 8) {
        alert('You cannot increase Vce further');
    }
}
function update_input_display() {
    let vbe_data = [];
    let ib_data = [];
    for (let i = 0; i < input_ch.length; i++) {
        if (input_ch[i]['vce'] == inp_sim_vce) {
            vbe_data = input_ch[i]['vbe'];
            ib_data = input_ch[i]['ib'];
            for (let j = 0; j < vbe_data.length; j++) {
                if (vbe_data[j] == inp_sim_vbe) {
                    inp_sim_ib = ib_data[j];
                    ib_dsp.value = inp_sim_ib.toString();
                    vce_dsp.value = inp_sim_vce.toString();
                    vbe_dsp.value = inp_sim_vbe.toString();
                    extra_vce_dsp.value = inp_sim_vce.toString() + ' volts';
                    break;
                }
            }
        }
    }
}
//controls for output characteristics
function out_ch_vce_dec() {
    if (out_sim_vce > 0) {
        out_sim_vce = out_sim_vce - 1;
        record_btn.disabled = false;
        update_output_display();
    }
    else if (out_sim_vce == 0) {
        alert('You cannot decrease Vce further');
        record_btn.disabled = true;
    }
}
function out_ch_vce_inc() {
    if (out_sim_vce < 10) {
        out_sim_vce = out_sim_vce + 1;
        update_output_display();
        record_btn.disabled = false;
    }
    else if (out_sim_vce == 10) {
        alert('You cannot increase Vce further');
        record_btn.disabled = true;
    }
}
function out_ch_ib_dec() {
    if (out_sim_ib > 10) {
        out_sim_ib = out_sim_ib - 10;
        update_output_display();
    }
    else if (out_sim_ib == 0) {
        alert('You cannot decrease ib further');
    }
}
function out_ch_ib_inc() {
    if (out_sim_ib < 50) {
        out_sim_ib = out_sim_ib + 10;
        update_output_display();
    }
    else if (out_sim_ib == 50) {
        alert('You cannot increase ib further');
    }
}
function update_output_display() {
    let vce_data = [];
    let ic_data = [];
    for (let i = 0; i < output_ch.length; i++) {
        if (output_ch[i]['ib'] == out_sim_ib) {
            vce_data = output_ch[i]['vce'];
            ic_data = output_ch[i]['ic'];
            for (let j = 0; j < vce_data.length; j++) {
                if (vce_data[j] == out_sim_vce) {
                    out_sim_ic = ic_data[j];
                    ic_dsp.value = out_sim_ic.toString();
                    vce_dsp.value = out_sim_vce.toString();
                    ib_dsp.value = out_sim_ib.toString();
                    extra_ib_dsp.value = out_sim_ib.toString() + ' microAmp';
                    break;
                }
            }
        }
    }
}
function set_first_constant() {
    // to restrict invalid vce value
    if (inp_sim_vce == 0) {
        alert('choose a valid vbe value');
        return;
    }
    let t = document.getElementById('off-vce');
    let btn = document.getElementById('power-dsp');
    let btn1 = document.getElementById('fbtn1');
    let btn2 = document.getElementById('fbtn2');
    let btn3 = document.getElementById('qa-we');
    t.innerHTML = inp_sim_vce.toString() + ' V';
    btn.disabled = true;
    btn1.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
}
function set_second_constant() {
    if (out_sim_ib == 10) {
        alert('choose a valid vce value');
        return;
    }
    let t = document.getElementById('off-ib');
    let btn = document.getElementById('power-dsp');
    let btn1 = document.getElementById('sbtn1');
    let btn2 = document.getElementById('sbtn2');
    let btn3 = document.getElementById('qa-wa');
    t.innerHTML = out_sim_ib.toString() + ` &mu;A`;
    btn.disabled = true;
    btn1.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
}
// to record and manage input observation table
// to record input observations
function record_observation() {
    let new_row = [];
    //to avoid duplicate entries;
    for (let i = 0; i < input_observation_table.length; i++) {
        if (input_observation_table[i][1] == inp_sim_vbe) {
            alert(`You have already entered observation for vce = ${inp_sim_vbe} V`);
            record_btn.disabled = true;
            return;
        }
    }
    record_btn.disabled = false;
    // to only allow incremental 5 observations
    // if(input_observation_table.length > 5) {
    // 	if(x != (input_observation_table[input_observation_table.length - 1][1] + 10)) {
    // 		alert(`You need to take observation for x = ${input_observation_table[input_observation_table.length - 1][1] + 10}cm first.`);
    // 		return;
    // 	}
    // } else {
    // 	if(x != 10) {
    // 		alert('Start taking observation from X = 10cm');
    // 		return;
    // 	}
    // }
    disable_buttons();
    //to add values in observation table
    let header = [`Sr no.`, `V<sub>BE</sub> (V)`, `I<sub>B</sub> (&mu;A)`];
    new_row.push(input_observation_table.length + 1);
    new_row.push(inp_sim_vbe);
    new_row.push(inp_sim_ib);
    input_observation_table.push(new_row);
    let parent = document.getElementById('obst');
    parent.innerHTML = ``;
    let tab = new Verify_Rows_Cols_Custom_Fixed_Update1(header, input_observation_table, [input_observation_table.length - 1], [[1, 2]], '', parent, true, true, verification_sucessful, 6);
    tab.load_table();
    // x1 = input_observation_table[input_observation_table.length - 1][1];
    // d1 = input_observation_table[input_observation_table.length - 1][3];
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight5'));
    bsOffcanvas.show();
}
// to verify input observations
function verification_sucessful() {
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight5'));
    bsOffcanvas.hide();
    let btn = document.getElementById('record-btn');
    btn.disabled = true;
    btn.className = 'btn btn-secondary';
    if (input_observation_table.length == 5) {
        let btn3 = document.getElementById('power-dsp');
        let btn = document.getElementById('record-btn');
        btn3.disabled = false;
        btn.onclick = record_out_observation;
        //btn.disabled = false;
        //modify offcampus and next steps
        pp.showtitle(`<p id="exp-title" style='width: 23vw;'>Output Characteristics Observations</span><p>`, 3);
        pp.showdescription(`<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: 17px;">- Click the Input Charatersitics button to shift to Output Charatersitics mode. <br> - Select a I<sub>B</sub> value and press set I<sub>B</sub> button  <br> - Take readings for output charateristics by varying V<sub>CE</sub> and clicking the record observation button <br> - Enter the values in table and press verify <br> - Repeat record observations 4 more times to complete the Output characteristics observation table.  </div>`, 3);
        var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight3'));
        bsOffcanvas.show();
    }
    else {
        enable_buttons();
    }
}
//function to disable buttons while adding new input observation
function disable_buttons() {
    let btn1 = document.getElementById('f-plus');
    let btn2 = document.getElementById('f-minus');
    let btn = document.getElementById('record-btn');
    btn1.disabled = true;
    btn2.disabled = true;
    btn.disabled = true;
}
//function to disable buttons after adding new input observation
function enable_buttons() {
    let btn1 = document.getElementById('f-plus');
    let btn2 = document.getElementById('f-minus');
    let btn = document.getElementById('record-btn');
    btn1.disabled = false;
    btn2.disabled = false;
    btn.disabled = false;
}
// to record and manage input observation table
// to record input observations
function record_out_observation() {
    let new_row = [];
    //to avoid duplicate entries;
    for (let i = 0; i < output_observation_table.length; i++) {
        if (output_observation_table[i][1] == out_sim_vce) {
            alert(`You have already entered observation for vce = ${out_sim_vce} V`);
            record_btn.disabled = true;
            return;
        }
    }
    record_btn.disabled = false;
    // to only allow incremental 5 observations
    // if(output_observation_table.length > 5) {
    // 	if(x != (output_observation_table[output_observation_table.length - 1][1] + 10)) {
    // 		alert(`You need to take observation for x = ${output_observation_table[output_observation_table.length - 1][1] + 10}cm first.`);
    // 		return;
    // 	}
    // } else {
    // 	if(x != 10) {
    // 		alert('Start taking observation from X = 10cm');
    // 		return;
    // 	}
    // }
    disable_out_buttons();
    //to add values in observation table
    let header = [`Sr no.`, `V<sub>CE</sub> (V)`, `I<sub>C</sub> (mA)`];
    new_row.push(output_observation_table.length + 1);
    new_row.push(out_sim_vce);
    new_row.push(out_sim_ic);
    output_observation_table.push(new_row);
    let parent = document.getElementById('out_obst');
    parent.innerHTML = ``;
    let tab = new Verify_Rows_Cols_Custom_Fixed_Update1(header, output_observation_table, [output_observation_table.length - 1], [[1, 2]], '', parent, true, true, verification_out_sucessful, 6);
    tab.load_table();
    // x1 = output_observation_table[output_observation_table.length - 1][1];
    // d1 = output_observation_table[output_observation_table.length - 1][3];
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight4'));
    bsOffcanvas.show();
}
// to verify input observations
function verification_out_sucessful() {
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight4'));
    bsOffcanvas.hide();
    let btn = document.getElementById('record-btn');
    btn.disabled = true;
    btn.className = 'btn btn-secondary';
    if (output_observation_table.length == 5) {
        // let btn3: HTMLButtonElement = <HTMLButtonElement> document.getElementById('power-dsp');
        // //let btn: HTMLButtonElement = <HTMLButtonElement> document.getElementById('record-btn');
        // btn3.disabled = false;
        // //btn.disabled = false;
        activity4();
    }
    else {
        enable_out_buttons();
    }
}
//function to disable buttons while adding new input observation
function disable_out_buttons() {
    let btn1 = document.getElementById('sbtn1');
    let btn2 = document.getElementById('sbtn2');
    let btn = document.getElementById('record-btn');
    btn1.disabled = true;
    btn2.disabled = true;
    btn.disabled = true;
}
//function to disable buttons after adding new input observation
function enable_out_buttons() {
    let btn1 = document.getElementById('sbtn1');
    let btn2 = document.getElementById('sbtn2');
    let btn = document.getElementById('record-btn');
    btn1.disabled = false;
    btn2.disabled = false;
    btn.disabled = false;
}
//activity3();
//# sourceMappingURL=activity3.js.map