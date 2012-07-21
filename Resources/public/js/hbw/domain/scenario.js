/*
 * This file is part of the Behat Wizard
 * (c) 2012 Jean-François Lépine <jeanfrancois@lepine.pro>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Scenario
 *
 * @author Jean-François Lépine <jeanfrancois@lepine.pro>
 */
hbw.domain.scenario = function() {

    /**
     * Form informations
     *
     * @var object
     */
    this.form = {
        name: 'default'
    }

    /**
     * Steps of the scenario
     *
     * @var array
     */
    this.steps = [];

    /**
     * Example of the scenario
     *
     * @var hbw.domain.outline
     */
    this.outline = null;

    /**
     * To string conversion
     *
     * @return string
     */
    this.toString = function () {
        var html, i;
        for(i in this.steps) {
            html += this.steps[i];
        }
        return html;
    }

    /**
     * Constructor
     *
     * @param data [ steps:[ {content:"", example: null}, ...], example: null ]
     * @return hbw.domain.scenario
     */
    this.initialize = function(datas) {
        var i, type, step, outline;
        var steps = datas['steps'],
        example = datas['example'];

        for(type in steps) {
            for(i in steps[type]) {
                step = new hbw.domain.step(type, steps[type][i]['content']);
                if(typeof(steps[type][i]['example']) != 'undefined') {
                    outline = new hbw.domain.outline(steps[type][i]['example']);
                    step.outline = outline;
                }
                this.addStep(step);
            }
        }

        outline = new hbw.domain.outline(example);
        this.outline = outline;
        return this;
    }

    /**
     * Push/insert step in the scenario
     *
     * @param step
     * @return hbw.domain.scenario
     */
    this.addStep = function(step, position) {
        position = position || this.steps.length;
        if(typeof(this.steps[position]) != 'undefined') {
            //
            // Moves other steps to insert the newest
            var i;
            for(i = this.steps.length - 1; i >= position; i--) {
                this.steps[i + 1] = this.steps[i];
            }
        }
        this.steps[position] = step;
        return this;
    }


    /**
     * Call the rendering
     *
     * @return hbw.domain.scenario
     */
    this.render= function() {
        return this;
    }

}