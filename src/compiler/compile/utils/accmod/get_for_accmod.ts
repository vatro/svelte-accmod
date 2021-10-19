// ### Process a 'MemberExpression' for accmod
export default function get_for_accmod(node_obj, renderer) {
    // all chain-members as 'keys' -> needed for creation of the corresponding '$cty_config'-entry
    const keys = [];

    // all computed chain members (also as 'ccms') -> used together with 'all_keys'
    // -> needed for 'accmod'-invalidation / creation of the corresponding '$cty_config'-entry
    let computed_members = undefined;

    function process_for_accmod(current_node_obj) {

        if (current_node_obj.property.type === 'Literal') {
            // TODO : push value (only numbers?!)
            keys.push(current_node_obj.property.value);
        } else {
            // 'event-handler-each-context-invalidation' test fix: do not include 'foo_index$' in keys
            // 'each-block-assignment' test fix: do not include 'foo_index' in keys
            if (current_node_obj.property.name) {
                // we're safe concerning Svelte '_index' named variables
                if (current_node_obj.property.name.indexOf('_index') === -1) {

                    add_key(current_node_obj);

                    // if one of those was found, check if it's a component property
                } else if (renderer.component.var_lookup.get(current_node_obj.property.name)) {

                    add_key(current_node_obj);

                }
                // else nothing, don't add to keys!
                // check if function-computed member
            } else if (current_node_obj.property.type === 'CallExpression') {
                add_key(current_node_obj);
                // # fix computed template-strings
                // node has no `type`-property
            } else if (current_node_obj.property.type === 'TemplateLiteral') {
                add_key(current_node_obj);
            }
        }

        if (current_node_obj.object) {
            if (current_node_obj.object.type === 'MemberExpression') {
                process_for_accmod(current_node_obj.object);
            }
        }
    }

    function add_key(current_node_obj) {

        if (current_node_obj.computed === false) {

            keys.push(current_node_obj.property.name);

        } else {

            if (!computed_members) {
                computed_members = {
                    type: 'ArrayExpression',
                    elements: []
                };
            }
            if (current_node_obj.property.name) {
                keys.push(current_node_obj.property.name);
                computed_members.elements.push({
                    type: 'ObjectExpression',
                    properties: [current_node_obj.property]
                });
            } else {
                if (current_node_obj.property.type === 'CallExpression') {

                    // function-computed member, e.g. component[some_function(args...)].foo = value
                    keys.push({
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: current_node_obj.property.callee.name
                        },
                        arguments: current_node_obj.property.arguments
                    });

                    computed_members.elements.push({
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                computed: true, // does the `[prop_name]: prop_value` 'trick' -> computed `prop_name`
                                key: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: current_node_obj.property.callee.name
                                    },
                                    arguments: current_node_obj.property.arguments
                                },
                                value: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: current_node_obj.property.callee.name
                                    },
                                    arguments: current_node_obj.property.arguments
                                }
                            }
                        ]
                    });
                } else if (current_node_obj.property.type === 'TemplateLiteral') {

                    keys.push({
                        type: 'TemplateLiteral',
                        quasis: current_node_obj.property.quasis,
                        expressions: current_node_obj.property.expressions // array
                    });

                    computed_members.elements.push({
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                computed: true, // does the `[prop_name]: prop_value` 'trick' -> computed `prop_name`
                                key: {
                                    type: 'TemplateLiteral',
                                    quasis: current_node_obj.property.quasis,
                                    expressions: current_node_obj.property.expressions
                                },
                                value: {
                                    type: 'TemplateLiteral',
                                    quasis: current_node_obj.property.quasis,
                                    expressions: current_node_obj.property.expressions
                                }
                            }
                        ]
                    });
                }
            }
        }
    }

    process_for_accmod(node_obj);

    keys.reverse();
    return { keys, computed_members };
}
