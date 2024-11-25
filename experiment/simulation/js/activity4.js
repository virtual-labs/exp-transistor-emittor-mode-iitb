let inp_ib_y = [];
let inp_vbe_x = [];
let out_ic_y = [];
let out_vce_x = [];
let in_others = [];
let out_others = [];
function activity4() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    load_chart_data();
    pp.showtitle(`<p id="exp-title" style='width: 23vw;'>Study the Plot</span><p>`, 3);
    pp.showdescription(`<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: 17px;">Here we will study the plot to analyse Input and Output Characteristics </div>`, 3);
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight3'));
    bsOffcanvas.show();
    let left_panel_text = `
         <div id='act4-left-content' style="position: absolute; font-size: 1.6vw;">

            <div style='position: relative; display: flex; flex-direction: row; justify-content: space-between; width: 80vw;'>

                <div><canvas style='border: 1px solid black; height: 20vw;' id='my-canvas1' ></canvas></div>

                <div><canvas style='border: 1px solid black; height: 20vw;' id='my-canvas2' ></canvas></div>
            
            </div>
            <br>

            <div id='t-4' style='position: relative; overflow: scroll;' ></div>

            

         </div>
     `;
    pp.addtoleftpannel(left_panel_text);
    //define the canvas
    pp.addcanvas('mycanvas');
    //pp.addtorightpannel(question_div_box, 3);
    //pp.showscore(0, 3);
    canvas = pp.canvas;
    context = canvas.getContext('2d');
    // add rect and scene
    // canvas.style.cursor = 'crosshair';
    // rect = canvas.getBoundingClientRect();
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
    // window.onload = a2_windowresize;
    // window.onresize = a2_windowresize;
    a4_windowresize();
    plot_input();
    plot_output();
    load_table4();
    //load_colors();
    // window.addEventListener('click', (event) => a3_mouseclick(event));
}
function a4_windowresize() {
    //canvas size
    a4_canvas_size();
    //canvas mapping
    a4_canvas_mapping();
    //draw scene
    //scene.draw();
}
function a4_canvas_size() {
    canvas.width = window.innerWidth * 0.91;
    canvas.height = ((canvas.width * 1080.0) / 1920) * 0.85;
    lscale = canvas.width / 1920.0;
    document.getElementById('leftpannel').style.height =
        canvas.height + 5 + 'px';
    document.getElementById('leftpannel').style.margin = '0';
}
function a4_canvas_mapping() {
    context.translate(0, canvas.height);
    context.scale(1, -1);
}
function load_table4() {
    let header = [`Sr no.`, `&Delta;I<sub>C</sub> mA`, `&Delta;I<sub>B</sub> &mu;A`, '&beta;', '&alpha;'];
    let parent = document.getElementById('t-4');
    //load values in calc_table
    let arr = [];
    let del_ic = output_ch[1]['ic'][6] - output_ch[0]['ic'][6];
    let del_ib = output_ch[1]['ib'] - output_ch[0]['ib'];
    let beta = (del_ic * 1000) / del_ib;
    let alpha = beta / (beta + 1);
    arr = [1, del_ic, del_ib, beta, alpha];
    calc_table.push(arr);
    arr = [];
    del_ic = output_ch[2]['ic'][6] - output_ch[1]['ic'][6];
    del_ib = output_ch[2]['ib'] - output_ch[1]['ib'];
    beta = (del_ic * 1000) / del_ib;
    alpha = beta / (beta + 1);
    arr = [2, del_ic, del_ib, beta, alpha];
    calc_table.push(arr);
    arr = [];
    del_ic = output_ch[3]['ic'][6] - output_ch[1]['ic'][6];
    del_ib = output_ch[3]['ib'] - output_ch[1]['ib'];
    beta = (del_ic * 1000) / del_ib;
    alpha = beta / (beta + 1);
    arr = [3, del_ic, del_ib, beta, alpha];
    calc_table.push(arr);
    arr = [];
    del_ic = output_ch[4]['ic'][6] - output_ch[2]['ic'][6];
    del_ib = output_ch[4]['ib'] - output_ch[2]['ib'];
    beta = (del_ic * 1000) / del_ib;
    alpha = beta / (beta + 1);
    arr = [4, del_ic, del_ib, beta, alpha];
    calc_table.push(arr);
    arr = [];
    del_ic = output_ch[4]['ic'][6] - output_ch[3]['ic'][6];
    del_ib = output_ch[4]['ib'] - output_ch[3]['ib'];
    beta = (del_ic * 1000) / del_ib;
    alpha = beta / (beta + 1);
    arr = [5, del_ic, del_ib, beta, alpha];
    calc_table.push(arr);
    let tab = new Verify_Rows_Cols_Custom_Fixed_Update1(header, calc_table, [0, 1], [[3, 4], [3, 4]], '', parent, true, true, after_table4_verification, 5);
    tab.load_table();
}
function after_table4_verification() {
    pp.showtitle(`<p id="exp-title" style='width: 23vw;'>Click Next to continue</span><p>`, 3);
    pp.showdescription(`<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: 17px;"><button class='btn btn-info' onclick='activity5();' >Next</button></div>`, 3);
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight3'));
    bsOffcanvas.show();
}
function load_chart_data() {
    for (let i = 0; i < input_observation_table.length; i++) {
        inp_ib_y.push(input_observation_table[i][1]);
        inp_vbe_x.push(input_observation_table[i][2]);
        out_ic_y.push(output_observation_table[i][1]);
        out_vce_x.push(output_observation_table[i][2]);
    }
    in_others.push({
        label: 'Experimental',
        data: inp_vbe_x,
        fill: false,
        borderColor: 'blue',
        tension: 0.5,
        showLine: true
    });
    // other input data 
    for (let i = 0; i < input_ch.length; i++) {
        let obj;
        if (input_ch[i]['vce'] == inp_sim_vce) {
            continue;
        }
        else {
            obj = {
                label: 'VCE = ' + input_ch[i]['vce'] + " V",
                data: input_ch[i]['ib'],
                fill: false,
                borderColor: `rgb(${i * 50}, 130, 168)`,
                tension: 0.5,
                showLine: true
            };
            in_others.push(obj);
        }
    }
    out_others.push({
        label: 'Experimental',
        data: out_vce_x,
        fill: false,
        borderColor: 'blue',
        tension: 0.5,
        showLine: true
    });
    // other input data 
    for (let i = 0; i < output_ch.length; i++) {
        let obj;
        if (output_ch[i]['ib'] == out_sim_ib) {
            continue;
        }
        else {
            obj = {
                label: 'IB = ' + output_ch[i]['ib'] + 'µA',
                data: output_ch[i]['ic'],
                fill: false,
                borderColor: `rgb(${i * 50}, 130, 168)`,
                tension: 0.5,
                showLine: true
            };
            out_others.push(obj);
        }
    }
}
function plot_input() {
    // new_task("Answer the Question");
    // new_message("Observe Graph Deviation");
    //document.getElementById("bt-103").remove();
    //document.getElementById('a8-main-div').innerHTML = ``;
    //display_message("Answer Question");
    //document.getElementById("a8-main-div").innerHTML += "<canvas id='myChart'></canvas>";
    // root.id = "act8";
    var ctx = document.getElementById('my-canvas1');
    ctx.style.backgroundColor = "white";
    // ctx.style.marginTop = "5px";
    // ctx.style.marginLeft = "10%";
    // ctx.style.padding = "10px";
    ctx.style.borderRadius = "8px";
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    // let labels = [0.004, 0.007, 0.010, 0.014, 0.020, 0.029, 0.039];
    // let data1=[82.28,96.86,104.07,108.28,112.48,117.68,125.35];//hi_expt
    // let data2=[146.90,183.50,204.11,230.09,256.89,290.83,323.49];//hi_st
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: inp_ib_y,
            datasets: in_others
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'IB (micro Amps)',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'VBE (V)',
                        font: { size: 14, weight: 'bold' }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Input Characteristics`,
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } }
            },
        }
    });
}
function plot_output() {
    // new_task("Answer the Question");
    // new_message("Observe Graph Deviation");
    //document.getElementById("bt-103").remove();
    //document.getElementById('a8-main-div').innerHTML = ``;
    //display_message("Answer Question");
    //document.getElementById("a8-main-div").innerHTML += "<canvas id='myChart'></canvas>";
    // root.id = "act8";
    let ctx = document.getElementById('my-canvas2');
    ctx.style.backgroundColor = "white";
    // ctx.style.marginTop = "5px";
    // ctx.style.marginLeft = "10%";
    // ctx.style.padding = "10px";
    ctx.style.borderRadius = "8px";
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    // let labels = [0.004, 0.007, 0.010, 0.014, 0.020, 0.029, 0.039];
    // let data1=[82.28,96.86,104.07,108.28,112.48,117.68,125.35];//hi_expt
    // let data2=[146.90,183.50,204.11,230.09,256.89,290.83,323.49];//hi_st
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: out_ic_y,
            datasets: out_others
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'IC (mA)',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'VCE (V)',
                        font: { size: 14, weight: 'bold' }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Output Characteristics`,
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } }
            },
        }
    });
}
//activity4();
//# sourceMappingURL=activity4.js.map