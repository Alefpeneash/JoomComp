<?php
defined('_JEXEC') or exit();

class RelationsViewRelations extends JViewLegacy{
     
    protected $items;
    protected $pagination;

    function display($tpl=null){
        $this->isStaff = in_array(10, JFactory::getUser()->groups);
        $this->items = $this->get('Items');
        parent::display($tpl);
    }

}
