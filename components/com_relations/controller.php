<?php
defined('_JEXEC') or exit();

class RelationsController extends JControllerLegacy{
    public function display($cachable = false, $urlparams = array()) {

        $user = JFactory::getUser();

        if ($user->get('guest') == 1) {
            $this->setRedirect(JRoute::_('index.php?option=com_users&view=login&return=' . base64_encode(JUri::current()), "You must be logged in to view this content"));
            return;
        }

        parent::display($cachable, $urlparams);
    }
}