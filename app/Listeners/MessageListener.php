<?php

namespace App\Listeners;

use App\Message;
use App\Events\MessageCreate;
use App\Events\MessageCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class MessageListener
{
    /**
     * Handle the created event.
     *
     * @param  MessageCreate  $event
     * @return void
     */
    public function create(MessageCreate $event)
    {
        $message = Message::create($event->data);

        event(new MessageCreated($message));
    }

    /**
     * Register the listeners for the subscriber.
     *
     * @param  Illuminate\Events\Dispatcher  $events
     */
    public function subscribe($events)
    {
        $events->listen(
            'App\Events\MessageCreate',
            'App\Listeners\MessageListener@create'
        );
    }
}
