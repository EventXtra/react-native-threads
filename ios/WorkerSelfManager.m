#import "ThreadSelfManager.h"
#include <stdlib.h>

@implementation ThreadSelfManager

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;
@synthesize parentBridge = _parentBridge;
@synthesize threadId = _threadId;

- (NSArray<NSString *> *)supportedEvents
{
  NSString *eventName = [NSString stringWithFormat:@"Thread%i", self.threadId];
  return @[@"ThreadMessage"];
}

RCT_EXPORT_METHOD(postMessage: (NSString *)message)
{
  if (self.parentBridge == nil) {
    NSLog(@"No parent bridge defined - abord sending thread message");
    return;
  }

  NSString *eventName = [NSString stringWithFormat:@"Thread%i", self.threadId];

  [self sendEventWithName:eventName body:message];
}

@end
