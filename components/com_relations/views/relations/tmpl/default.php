<?php defined('_JEXEC') || defined( '_VALID_CB' ) or exit(); ?>
<?php JHtml::_('jquery.framework', false); ?>
<?php JHTML::script('https://cdnjs.cloudflare.com/ajax/libs/gojs/1.8.12/go.js'); ?>
<?php JHTML::script('media/com_relations/js/relations.js'); ?>
<?php JHTML::stylesheet('media/com_relations/css/stylesheet.css'); ?>

<div id="myDiagramDiv" ></div>

<script type="text/javascript">
    let body = document.getElementsByTagName("body")[0];
    body.addEventListener("load", diagram(<?php echo json_encode($this->items) ?>))
</script>